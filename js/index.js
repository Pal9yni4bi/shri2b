(function (root) {
    var map = root.maze.MAZE_Y;
    var path = root.maze.solution(map, 1, 0);

	
	if (path && path.length) {
		var pathLength = path.length,
			i = 0;
		    document.querySelector('.outer').appendChild(document.createElement("div"));
		var intervalID = setInterval(action, 500); // ход каждые полсекунды
		function action() {
			if (i <= pathLength) {
				var partialPath = path.slice(0, i);
				document.querySelector('.outer').replaceChild (
					root.maze.render(map, partialPath),
					document.querySelector('.outer').childNodes[0]
				);
				i++;
			} else {
				clearInterval(intervalID);
			}
			
		}
	}
})(this);
