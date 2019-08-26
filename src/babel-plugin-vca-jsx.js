const syntaxJsx = require('@babel/plugin-syntax-jsx').default;

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

const hasSetup = (t, path) => {
    const SetupChecker = {
        hasSetup: false
    };
    path.traverse({
        ObjectMethod(p) {
            if (p.node.key.name === 'setup') {
                this.hasSetup = true;
            }
        }
    }, SetupChecker);
    return SetupChecker.hasSetup;
}

module.exports = ({ types: t }) => {
    return {
        inherits: syntaxJsx,
        visitor: {
            Program(path) {
                path.traverse({
                    ObjectMethod(p) {
                        if (!hasJSX(t, p) || !this.hasSetup) return;

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

                        const importNodes = path.get('body').filter(p => p.isImportDeclaration()).map(p => p.node);
                        const vfaImportNodes = importNodes.filter(p => p.source.value === '@vue/composition-api');
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
                                path.unshiftContainer('body', t.importDeclaration([vfaImportSpecifier], t.stringLiteral('@vue/composition-api')));
                            }
                        }
                    }
                }, {
                    hasSetup: hasSetup(t, path)
                });
            }
        }
    }
}
