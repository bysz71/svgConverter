QUnit.test( "vectorsToCoordinates test", function(assert){
    var actual = [
        [
            [10,10],
            [20,20],
            [-20,20],
            [-20,-20]
        ],
        [
            [40,40],
            [20,20],
            [-20,20],
            [-20,-20]
        ]
    ];
    var expected = [
        [
            [10,10],
            [30,30],
            [10,50],
            [-10,30]
        ],
        [
            [30,70],
            [50,90],
            [30,110],
            [10,90]
        ]
    ]
    vectorsToCoordinates(actual);
    assert.deepEqual(expected, actual, "Passed");
});

QUnit.test("findLinkIndex test", function(assert){
    var area1 = [
        [20,20],
        [40,40],
        [20,60],
        [0,40]
    ];
    var area2 = [
        [80,20],
        [100,40],
        [80,60],
        [60,40]
    ];
    var expected = [1,3];
    assert.deepEqual(expected, findLinkIndex(area1, area2), "Passed");
});