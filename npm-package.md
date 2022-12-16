Mises à jour des dépendances
Il faut bien sûr mettre à jour ses dépendances régulièrement. Vous pouvez faire le point avec la commande npm outdated.

Le semantic versioning permet de faciliter ces mises à jour. Si la commande npm update est lancée, npm fera automatiquement les mises à jour patchs et mineures, puisqu’elles sont rétro-compatibles !

C’est cela que signifie l’accent circonflexe devant les versions : ^1.0.0.

npm ne fera en revanche pas automatiquement les mises à jour majeures, car cela pourrait casser votre projet. Cela ne veut pas dire qu’il ne faut pas les faire, mais il faut le faire manuellement, en précisant la nouvelle version souhaitée : npm install rxjs@6. Puis tester.

Il existe d’autres signes, à éviter le plus possible, pour gérer des exceptions (des librairies qui respectent mal le semantic versioning). ~1.0.0 signifie que seules les mises à jour patchs seront faites lors d’un npm update. TypeScript est l’une des principales exceptions concernées.

package-lock.json
Le semantic versioning est génial pour faciliter les mises à jour, mais si c’était le même système qui était utilisé pour l’installation des dépendances, cela risquerait d’entraîner des problèmes, car tout le monde dans une équipe n’aurait pas forcément exactement la même installation.

C’est à cela que sert le package-lock.json. C’est un descriptif exact de l’installation du projet, afin qu’elle soit exactement la même sur tous les postes. Ne touchez pas à ce fichier : il est mis à jour automatiquement à chaque fois que vous ajoutez, supprimez ou mettez à jour une dépendance. Il faut par contre penser à le commiter.