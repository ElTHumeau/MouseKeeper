#!/bin/bash

# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit"

echo "git remote add origin https://github.com/votre-nom/mousekeeper.git"
echo "git push -u origin main" 