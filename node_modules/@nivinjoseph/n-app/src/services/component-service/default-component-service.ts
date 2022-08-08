import { given } from "@nivinjoseph/n-defensive";
import { ComponentService } from "./component-service";
import { ViewModelRegistration } from "../../core/view-model-registration";
import { Container, Scope } from "@nivinjoseph/n-ject";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { Utilities } from "../../core/utilities";
import { ComponentOptions } from "./component-options";


export class DefaultComponentService implements ComponentService
{
    public compile(componentViewModelClass: Function, cache?: boolean): ComponentOptions
    {
        given(componentViewModelClass, "componentViewModelClass").ensureHasValue().ensureIsFunction();
        given(cache as boolean, "cache").ensureIsBoolean();

        const registration = new ViewModelRegistration(componentViewModelClass);

        return this.create(registration, !!cache);
    }


    public create(registration: ViewModelRegistration, cache: boolean): ComponentOptions
    {
        given(registration, "registration").ensureHasValue().ensureIsType(ViewModelRegistration);
        given(cache, "cache").ensureHasValue().ensureIsBoolean();

        const component: any = {};
        component._cache = cache;

        // component.template = registration.template;

        if (typeof registration.template === "string")
        {
            component.template = registration.template;
        }
        else
        {
            component.render = registration.template.render;
            component.staticRenderFns = registration.template.staticRenderFns;
        }

        component.inject = ["pageScopeContainer", "rootScopeContainer"];

        component.data = function (): { vm: any; }
        {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const vueVm = this;

            const container: Scope | null = vueVm.pageScopeContainer || vueVm.rootScopeContainer;
            if (!container)
                throw new ApplicationException("Could not get pageScopeContainer or rootScopeContainer.");

            if (component.___reload)
            {
                const c = container as Container;
                // @ts-expect-error: deliberately accessing protected member
                const cReg = c.componentRegistry.find(registration.name)!;
                // @ts-expect-error: deliberately accessing private member
                cReg._component = component.___viewModel;
                // @ts-expect-error: deliberately calling private method and accessing private member
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                cReg._dependencies = cReg._getDependencies();

                component._cachedVm = null;

                // registration.reload(component.___viewModel);

                component.___reload = false;
            }

            let vm: any = null;
            if (component._cache)
            {
                if (component._cachedVm)
                    vm = component._cachedVm;
                else
                    vm = component._cachedVm = container.resolve<any>(registration.name);
            }
            else
            {
                vm = container.resolve<any>(registration.name);
            }

            const data = { vm: vm };
            const methods: { [index: string]: any; } = {};
            const computed: { [index: string]: any; } = {};

            const propertyInfos = Utilities.getPropertyInfos(vm);
            for (const info of propertyInfos)
            {
                if (typeof info.descriptor.value === "function")
                    methods[info.name] = (info.descriptor.value as Function).bind(vm);
                else if (info.descriptor.get || info.descriptor.set)
                {
                    computed[info.name] = {
                        get: info.descriptor.get ? info.descriptor.get.bind(vm) : undefined,
                        set: info.descriptor.set ? info.descriptor.set.bind(vm) : undefined
                    };
                }
            }

            vueVm.$options.methods = methods;
            vueVm.$options.computed = computed;
            vm._ctx = vueVm;
            vm._bindings = [];

            return data;
        };


        component.beforeCreate = function (): void
        {
            // console.log("executing beforeCreate");
            // console.log(this.vm);
        };

        component.created = function (): void
        {
            // console.log("executing created");
            // console.log(this.vm);

            if (this.vm.onCreate)
            {
                if (registration.persist && registration.isCreated)
                {
                    // no op
                }
                else
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    this.vm.onCreate();
            }

            registration.created();
        };

        component.beforeMount = function (): void
        {
            // console.log("executing beforeMount");
            // console.log(this.vm);
        };

        component.mounted = function (): void
        {
            // console.log("executing mounted");
            // console.log(this.vm);

            if (this.vm.onMount)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this.vm.onMount(this.$el);
        };

        component.beforeUpdate = function (): void
        {
            // console.log("executing beforeUpdate");
            // console.log(this.vm);
        };

        component.updated = function (): void
        {
            // console.log("executing updated");
            // console.log(this.vm);
        };

        component.beforeDestroy = function (): void
        {
            // console.log("executing beforeDestroy");
            // console.log(this.vm);

            if (this.vm.onDismount)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this.vm.onDismount();
        };

        component.destroyed = function (): void
        {
            // console.log("executing destroyed");
            // console.log(this.vm);

            if (this.vm.onDestroy && !registration.persist)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this.vm.onDestroy();

            this.vm._ctx.$options.methods = null;
            this.vm._ctx.$options.computed = null;
            // this.vm._ctx = null;
            this.vm = null;
        };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return component;
    }
}