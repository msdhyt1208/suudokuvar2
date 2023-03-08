
const suudoku_bord_Els = document.querySelectorAll("main ul>li");



let fake_ids =[new Array(10).fill("0")];
let game_ids = []
let game_bord =[
  new Array(10).fill(0),
  new Array(10).fill(0),
  new Array(10).fill(0),
  new Array(10).fill(0),
  new Array(10).fill(0),
  new Array(10).fill(0),
  new Array(10).fill(0),
  new Array(10).fill(0),
  new Array(10).fill(0),
  new Array(10).fill(0)
];

let possible = game_bord.map((arrays) =>{
   const array = arrays.map (()=>[...[1,2,3,4,5,6,7,8,9]]);
  return [...array];
})
let record=[]
record.push([JSON.parse(JSON.stringify(game_bord))]);

let ids =[];
for(cell in suudoku_bord_Els){
  ids.push (cell);
  if(Math.floor(cell%9)==8){
    fake_ids.push(["0",...ids]);

    ids.length=0;
  }  
}

game_ids.length = 0;
game_ids = fake_ids.map((array)=>[...array]); 
for(let n=0;n<3;n++){
  for(let j=0;j<3;j++){
    game_ids[(1+3*n)][4+j] = fake_ids[(2+3*n)][1+j];
    game_ids[(1+3*n)][7+j] = fake_ids[(3+3*n)][1+j];
    game_ids[(2+3*n)][1+j] = fake_ids[(1+3*n)][4+j];
    game_ids[(2+3*n)][7+j] = fake_ids[(3+3*n)][4+j];
    game_ids[(3+3*n)][1+j] = fake_ids[(1+3*n)][7+j];
    game_ids[(3+3*n)][4+j] = fake_ids[(2+3*n)][7+j];
  }
}

console.log(fake_ids);
console.log(game_bord);
for(cell in suudoku_bord_Els){
  row= Math.floor(cell%9)+1;
  colmun = Math.floor(cell/9)+1;
  if(isNaN(cell)) break;
  suudoku_bord_Els[cell].id = game_ids[colmun][row];
}


///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
// const gaibubord =[
//   [0,0,0,0,0,3,0,0,0,0],
//   [0,0,0,0,0,3,0,0,0,0],
//   [0,0,0,3,5,2,0,0,4,9],
//   [0,0,0,0,0,6,0,1,5,0],
//   [0,0,0,4,8,9,0,0,0,0],
//   [0,2,0,0,0,0,0,0,8,0],
//   [0,0,9,0,0,0,0,7,0,0],
//   [0,0,6,0,0,0,3,0,0,0],
//   [0,0,7,8,0,5,0,0,3,2],
//   [0,0,0,0,4,0,0,0,0,0]
// ]
// for(id in suudoku_bord_Els){
//   if(isNaN(id))break;
  
//   $("#"+id).text(gaibubord[Math.floor(id/9)+1][id%9+1] ? gaibubord[Math.floor(id/9)+1][id%9+1]:"");
// }

///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////



function clear(target){
  if(cheak("row",target)&&cheak("col",target)&&cheak("blc",target))  return true;
  else false;
} 
function cheak(selc,target){
  const bord =[];
  switch(selc){
    case "row":
      for(i=0;i<10;i++){
        bord[i] = game_bord[i][target.row];
      } break;
    case "col":
      for(i=0;i<10;i++){
        bord[i] = game_bord[target.colmun][i];
      } break;
    case "blc":
      const strRow = Math.floor((target.row-1)/3)*3+1;
      const strcolmun = Math.floor((target.colmun-1)/3)*3+1;
        bord[0] = 0;
        bord[1] = game_bord[strcolmun][strRow];
        bord[2] = game_bord[strcolmun][strRow+1];
        bord[3] = game_bord[strcolmun][strRow+2];
        bord[4] = game_bord[strcolmun+1][strRow];
        bord[5] = game_bord[strcolmun+1][strRow+1];
        bord[6] = game_bord[strcolmun+1][strRow+2];
        bord[7] = game_bord[strcolmun+2][strRow];
        bord[8] = game_bord[strcolmun+2][strRow+1];
        bord[9] = game_bord[strcolmun+2][strRow+2];
    break;
    default :return true;
  }  

  const result = bord.filter(function(value ,index,array){
      // array.indexOf(value) === index;
    if(value !== 0) return  array.indexOf(value) !== index;
  })
  bord.length = 0;
  if(result.length === 0) return true;
  return false;
}
function spaseFind (possible){
  for(id in suudoku_bord_Els){
    // let idElement = document.querySelector("#"+id);
    if(isNaN(id)) break;
    row    = id%9+1;
    colmun = Math.floor(id/9)+1; 
    if($("#"+id).text() == ""&&possible[colmun][row].length == 0)  return false;

  }
  return true;
}
function theEnd (elemen){
  for(i of elemen){
    if(i.textContent != "")continue;
    return true;
  }
  return false;
}