const blocks = {
    tree: [
        [[1, 0], [0, 1], [1, 1], [2, 1]],
        [[1, 0], [0, 1], [1, 1], [1, 2]],
        [[2, 1], [0, 1], [1, 1], [1, 2]],
        [[2, 1], [1, 2], [1, 1], [1, 0]],
    ],
    square: [
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
    ],
    bar: [
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]],
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]],
    ],
    zee: [
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 1], [1, 0], [1, 1], [0, 2]],
        [[0, 1], [1, 1], [1, 2], [2, 2]],
        [[2, 0], [2, 1], [1, 1], [1, 2]],
    ],
    zee2: [
        [[0, 1], [1, 1], [1, 0], [2, 0]],
        [[0, 0], [0, 1], [1, 1], [1, 2]],
        [[0, 1], [1, 1], [1, 0], [2, 0]],
        [[0, 0], [0, 1], [1, 1], [1, 2]]
    ],
    elLeft: [
        [[0, 0], [0, 1], [1, 1], [2, 1]],
        [[1, 0], [0, 0], [0, 1], [0, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 2]],
        [[1, 2], [2, 0], [2, 1], [2, 2]],
    ],
    elRight: [
        [[0, 1], [1, 1], [2, 1], [2, 0]],
        [[1, 0], [1, 1], [1, 2], [2, 2]],
        [[0, 2], [0, 1], [1, 1], [2, 1]],
        [[0, 0], [1, 0], [1, 1], [1, 2]],
    ]
};

export default blocks;