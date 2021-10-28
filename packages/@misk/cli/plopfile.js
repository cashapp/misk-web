module.exports = function (plop) {
    plop.setGenerator('basic', {
        description: 'New basic misk-web tab',
        prompts: [{
            type: 'new',
            name: 'new',
            message: 'unused'
        },{
            type: 'input',
            name: 'titleCaseName',
            message: 'New tab name, in title case'
        },{
            type: 'input',
            name: 'name',
            message: 'New tab name, in slug case'
        }],
        actions: [{
            type: 'addMany',
            destination: '{{name}}/',
            base: 'plop-templates/basic/',
            templateFiles: [
                'plop-templates/basic/.gitignore',
                'plop-templates/basic/miskTab.json',
                'plop-templates/basic/package.json',
                'plop-templates/basic/src/**/*',
                'plop-templates/basic/tests/**/*',
            ],
            transform: (s, data) => {
                // Handlebars handles most of these, but need to have a valid package name
                // to test the template project, so do a custom find-and-replace here.
                return s.replaceAll("template-basic", data.name)
            }
        }]
    });
};
