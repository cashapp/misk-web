module.exports = function (plop) {
    // controller generator
    plop.setGenerator('basic', {
        description: 'New basic misk-web tab',
        prompts: [{
            type: 'new',
            name: 'new',
            message: 'unused'
        },{
            type: 'input',
            name: 'titleCase',
            message: 'New tab name, in title case'
        },{
            type: 'input',
            name: 'slugCase',
            message: 'New tab name, in slug case'
        }],
        actions: [{
            type: 'addMany',
            destination: '{{slugCase}}/',
            base: 'plop-templates/basic/',
            templateFiles: [
                'plop-templates/basic/.gitignore',
                'plop-templates/basic/**/*'
            ]
        }]
    });
};
