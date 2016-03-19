(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {
		var current = [x, y], // будет равно [1, 0], если условия не изменились
			pathfinder = [[x, y]]; // точку старта нужно отметить заранее
		(function() {
			var direction = [],
				M = maze.length-1, // высота лабиринта
				N = maze[0].length-1, // ширина лабиринта
				prevStep = [];
			for (stopper = false; stopper !== true; ) {
				if (current[1] > 0) direction["up"] = (maze[current[1] - 1][current[0]] == 0);
				if (current[0] < N) direction["right"] = (maze[current[1]][current[0] + 1] == 0);
				if (current[1] < M) direction["down"] = (maze[current[1] + 1][current[0]] == 0);
				if (current[0] > 0) direction["left"] = (maze[current[1]][current[0] - 1] == 0);
				var variants = 0;
				for (var dir in direction) {
					if (direction[dir] == true) variants++;
				}
				if (variants == 0) {
					maze[current[1]][current[0]] = -4; // помечаем как пройденную, чтобы не вернуться
					pathfinder.reverse(); // разворачиваем путь для перебора с конца
					for (var i = 0; i <= pathfinder.length; i++) {
						if (maze[pathfinder[i][1]][pathfinder[i][0]] == -5) {
							current[0] = pathfinder[i][0];
							current[1] = pathfinder[i][1];
							pathfinder.splice(0, i+1);
							break;
						}
						if (i == pathfinder.length) {
							alert("Произошла ошибка: лабиринт не имеет выхода, кроме входа");
							pathfinder = [
								[1, 0]
							]
							return pathfinder;
						}
					}
					pathfinder.reverse(); // возвращаем порядок точек в пути к правильному варианту
				} else if (variants == 1) {
					maze[current[1]][current[0]] = -4; // помечаем как пройденную, чтобы не вернуться
					prevStep = current.slice();
					if (direction["up"]) {
						current[1] -= 1;
					} else if (direction["right"]) {
						current[0] += 1;
					} else if (direction["down"]) {
						current[1] += 1;
					} else if (direction["left"]) {
						current[0] -= 1;
					}
				} else if (variants == 2) {
					maze[current[1]][current[0]] = -5; // отмечаем точку как ключевую
					if (direction["up"] && (current[1] - 1) !== prevStep[1]) {
						prevStep = current.slice();
						current[1] -= 1;
					} else if (direction["right"] && (current[0] + 1) !== prevStep[0]) {
						prevStep = current.slice();
						current[0] += 1;
					} else if (direction["down"] && (current[1] + 1) !== prevStep[1]) {
						prevStep = current.slice();
						current[1] += 1;
					} else if (direction["left"] && (current[0] - 1) !== prevStep[0]) {
						prevStep = current.slice();
						current[0] -= 1;
					}
				} else if (variants > 2) {
					maze[current[1]][current[0]] = -5; // отмечаем точку как ключевую
					prevStep = current.slice();
					if (direction["up"] && (current[1] - 1) !== prevStep[1]) {
						prevStep = current.slice();
						current[1] -= 1;
					} else if (direction["right"] && (current[0] + 1) !== prevStep[0]) {
						prevStep = current.slice();
						current[0] += 1;
					} else if (direction["down"] && (current[1] + 1) !== prevStep[1]) {
						prevStep = current.slice();
						current[1] += 1;
					} else if (direction["left"] && (current[0] - 1) !== prevStep[0]) {
						prevStep = current.slice();
						current[0] -= 1;
					}
				}
				pathfinder.push(current.slice());
				if (current[1] == M) stopper = true;
			}
		})();
        return pathfinder;
    }

    root.maze.solution = solution;
})(this);
