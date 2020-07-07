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

/**
 * Declares "const h = ctx.root.$createElement" within the "setup" scope to render JSX
 *
 */
const insertDeclareCreateElement = (t, path) => {
    path.traverse({
        ObjectProperty(p) {
            const isSetup = p.node.key.name === "setup";
            if (!isSetup) return;
            const value = p.get("value");
            const body = value.get("body");
            body.unshiftContainer(
                "body",
                t.variableDeclaration("const", [
                    t.variableDeclarator(
                        t.identifier("h"),
                        t.memberExpression(
                            t.memberExpression(
                                t.identifier("ctx"),
                                t.identifier("root"),
                                false
                            ),
                            t.identifier("$createElement"),
                            false
                        )
                    ),
                ])
            );
        },
    });
}

module.exports = ({ types: t }) => {
    return {
        inherits: syntaxJsx,
        visitor: {
            Program(path) {
                remove$createElement(t, path);
                insertDeclareCreateElement(t, path);
            }
        }
    }
}
