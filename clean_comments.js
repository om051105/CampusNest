const fs = require('fs');

const htmlFiles = ['index.html', 'listings.html', 'property.html', 'dashboard.html', 'owner.html', 'auth.html'];
for (const file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Remove HTML comments
        content = content.replace(/<!--[\s\S]*?-->/g, '');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned HTML comments in ${file}`);
    }
}

if (fs.existsSync('app.js')) {
    let content = fs.readFileSync('app.js', 'utf8');
    // Remove JS single-line comments but avoid URLs like http://
    content = content.replace(/(?<!https?:)\/\/.*$/gm, '');
    fs.writeFileSync('app.js', content, 'utf8');
    console.log(`Cleaned JS comments in app.js`);
}
