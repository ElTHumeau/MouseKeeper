const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Créer le dossier scripts s'il n'existe pas
if (!fs.existsSync('scripts')) {
  fs.mkdirSync('scripts');
}

// Créer le dossier dist s'il n'existe pas
if (!fs.existsSync('dist')) {
  console.error('Le dossier dist n\'existe pas. Exécutez d\'abord npm run build.');
  process.exit(1);
}

// Lire la version depuis package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

// Créer le nom du fichier ZIP
const zipFileName = `mousekeeper-v${version}.zip`;
const output = fs.createWriteStream(path.join(__dirname, '..', zipFileName));
const archive = archiver('zip', {
  zlib: { level: 9 } // Niveau de compression maximum
});

// Écouter les événements
output.on('close', () => {
  console.log(`Archive créée: ${zipFileName}`);
  console.log(`Taille totale: ${archive.pointer()} octets`);
});

archive.on('error', (err) => {
  throw err;
});

// Pipe l'archive vers le fichier de sortie
archive.pipe(output);

// Ajouter le contenu du dossier dist à l'archive
archive.directory('dist/', false);

// Finaliser l'archive
archive.finalize(); 