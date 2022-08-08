"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTreeBuilder = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const page_1 = require("./page");
class PageTreeBuilder {
    constructor(root, pageRegistrations) {
        (0, n_defensive_1.given)(root, "root").ensureHasValue().ensureIsType(page_1.Page);
        (0, n_defensive_1.given)(pageRegistrations, "pageRegistrations").ensureHasValue().ensureIsArray().ensure(t => t.isNotEmpty);
        this._root = root;
        this._registrations = pageRegistrations;
    }
    build() {
        this._buildTree();
        return this._shakeTree();
    }
    _buildTree() {
        for (const registration of this._registrations) {
            let currentNode = this._root;
            for (const segment of registration.route.pathSegments) {
                if (segment === currentNode.segment)
                    continue;
                let node = currentNode.children.find(t => t.segment === segment);
                if (!node)
                    node = new page_1.Page(segment, currentNode);
                currentNode = node;
            }
            currentNode.attachRegistration(registration);
        }
    }
    _shakeTree() {
        const nodesToProcess = new Array();
        // skip root
        nodesToProcess.push(...this._root.children);
        while (nodesToProcess.length > 0) {
            const currentNode = nodesToProcess.shift();
            const children = currentNode.children;
            if (!currentNode.registration) {
                for (const child of children)
                    child.changeParent(currentNode.parent);
            }
            nodesToProcess.push(...children);
        }
        if (this._root.registration)
            return [this._root];
        const children = this._root.children;
        for (const child of children)
            child.changeParent(null);
        return children;
    }
}
exports.PageTreeBuilder = PageTreeBuilder;
//# sourceMappingURL=page-tree-builder.js.map