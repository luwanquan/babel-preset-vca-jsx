const syntaxJsx = require('@babel/plugin-syntax-jsx').default;

const importSource = '@vue/composition-api';

const hasJSX = (t, path) => {
    const JSXChecker = {
        hasJSX: false
    };
    path.traverse({
        JSXElement() {
            this.hasJSX = true
        }
    }, JSXChecker);
    return JSXChecker.hasJSX;
};

// remove `var h = this.$createElement;` in `setup()`
const remove$createElement = (t, path) => {
    path.traverse({
        ObjectMethod(p) {
            const isSetup = p.node.key.name === 'setup';
            if (!isSetup) return;
            p.traverse({
                VariableDeclaration(varPath) {
                    varPath.traverse({
                        MemberExpression(p) {
                            if (t.isThisExpression(p.node.object) && t.isIdentifier(p.node.property) && p.node.property.name === '$createElement') {
                                varPath.remove();
                            }
                        }
                    })
                }
            });
        }
    });
};

// auto import `createElement as h` from `@vue/composition-api`
const autoImport = (t, path) => {
    if (hasJSX(t, path)) {
        const importNodes = path.get('body').filter(p => p.isImportDeclaration()).map(p => p.node);
        const vfaImportNodes = importNodes.filter(p => p.source.value === importSource);
        const hasH = vfaImportNodes.some(p => (
            p.specifiers.some(s => (
                t.isImportSpecifier(s) && s.imported.name === 'createElement' && s.local.name === 'h'
            ))
        ));
        if (!hasH) {
            const vfaImportSpecifier = t.importSpecifier(t.identifier('h'), t.identifier('createElement'));
            if (vfaImportNodes.length > 0) {
                vfaImportNodes[0].specifiers.push(vfaImportSpecifier);
            } else {
                path.unshiftContainer('body', t.importDeclaration([vfaImportSpecifier], t.stringLiteral(importSource)));
            }
        }
    }
}

module.exports = ({ types: t }) => {
    return {
        inherits: syntaxJsx,
        visitor: {
            Program(path) {
                remove$createElement(t, path);
                autoImport(t, path);
            }
        }
    }
}
