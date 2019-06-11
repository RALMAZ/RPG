const ground = [
  [2, 2, 1, 1, 4, 4, 1, 6, 2, 2, 2, 2, 2, 2, 1, 1, 4, 4, 1, 6, 2, 2, 2],
  [2, 6, 1, 0, 4, 4, 0, 0, 2, 2, 2, 2, 2, 6, 1, 0, 4, 4, 0, 0, 2, 2, 2],
  [6, 1, 0, 0, 4, 4, 0, 0, 2, 2, 2, 2, 6, 1, 0, 0, 4, 4, 0, 0, 2, 2, 2],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 4, 4, 0, 0, 0, 2, 2],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
  [1, 1, 7, 1, 3, 3, 1, 7, 1, 1, 1, 1, 1, 1, 7, 1, 3, 3, 1, 7, 1, 1, 1],
  [3, 7, 3, 3, 3, 3, 3, 3, 7, 3, 3, 1, 3, 7, 3, 3, 3, 3, 3, 3, 7, 3, 3],
  [7, 1, 7, 7, 3, 3, 7, 7, 1, 1, 7, 1, 7, 1, 7, 7, 3, 3, 7, 7, 1, 1, 7],
  [2, 2, 1, 1, 4, 4, 1, 6, 2, 2, 2, 2, 2, 2, 1, 1, 4, 4, 1, 6, 2, 2, 2],
  [2, 6, 1, 0, 4, 4, 0, 0, 2, 2, 2, 2, 2, 6, 1, 0, 4, 4, 0, 0, 2, 2, 2],
  [6, 1, 0, 0, 4, 4, 0, 0, 2, 2, 2, 2, 6, 1, 0, 0, 4, 4, 0, 0, 2, 2, 2],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 4, 4, 0, 0, 0, 2, 2],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
  [1, 1, 7, 1, 3, 3, 1, 7, 1, 1, 1, 1, 1, 1, 7, 1, 3, 3, 1, 7, 1, 1, 1],
  [3, 7, 3, 3, 3, 3, 3, 3, 7, 3, 3, 1, 3, 7, 3, 3, 3, 3, 3, 3, 7, 3, 3],
  [7, 1, 7, 7, 3, 3, 7, 7, 1, 1, 7, 1, 7, 1, 7, 7, 3, 3, 7, 7, 1, 1, 7],
];

const groundNames = [];
groundNames[0] = 'barrelsE';
groundNames[1] = 'dirtW';
groundNames[2] = 'stoneUnevenE';
groundNames[3] = 'stoneMissingTilesS';
groundNames[4] = 'planksBrokenE';
groundNames[5] = 'dirtTilesW';
groundNames[6] = 'stoneSideUnevenN';
groundNames[7] = 'stoneW';

const object = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 1, 4, 0, 0, 4, 0, 0, 4, 3, 1, 2, 3, 0, 0, 0, 0, 0, 0, 4, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 1, 4, 0, 0, 4, 0, 0, 4, 3, 1, 2, 3, 0, 0, 0, 0, 0, 0, 4, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const objectNames = [];
objectNames[0] = '';
objectNames[1] = 'tableRoundItemsChairsE';
objectNames[2] = 'stoneWallAgedLeftE';
objectNames[3] = 'stoneWallStructureE';
objectNames[4] = 'Male7Idle0';
objectNames[5] = 'Male2Idle0';

const walkable = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


// User schema
/*

Male_1_Idle0_result

Male_1_Pickup0_result
Male_1_Pickup1_result
Male_1_Pickup2_result
Male_1_Pickup3_result
Male_1_Pickup4_result
Male_1_Pickup5_result
Male_1_Pickup6_result
Male_1_Pickup7_result
Male_1_Pickup8_result
Male_1_Pickup9_result

Male_1_Run0_result
Male_1_Run1_result
Male_1_Run2_result
Male_1_Run3_result
Male_1_Run4_result
Male_1_Run5_result
Male_1_Run6_result
Male_1_Run7_result
Male_1_Run8_result
Male_1_Run9_result

*/

export default { ground, object, groundNames, objectNames, walkable };