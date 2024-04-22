const fs = require('fs');
const path = require('path');

const modelsPath = path.join(__dirname, '..', 'weights');

const run = async () => {
    const files = fs.readdirSync(modelsPath);
    for (const file of files) {
        if (file.endsWith('.json')) {
            continue;
        }

        const buffer = fs.readFileSync(`${modelsPath}/${file}`);

        console.log(`const ${file} = "${buffer.toString('hex')}";`);
    }
}

run()
  .then(() => console.log(''))
  .catch(console.error);
