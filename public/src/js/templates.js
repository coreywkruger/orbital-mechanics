angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/templates/canvas.html","<div>\n	<canvas id=\"myCanvas\" width=\"500\" height=\"500\"></canvas>\n</div>");
$templateCache.put("/templates/main.html","<div canvas-dir />");}]);