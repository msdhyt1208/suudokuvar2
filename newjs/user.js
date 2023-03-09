target =[];
for(cell of suudoku_bord_Els){
  cell.addEventListener("click",function(){
    $(".select").removeClass();
    $(this).addClass("select");
    $("#numbar").removeClass();
    $("#numbar").addClass("inputOn");

    target = {
      id: this.id,
      row: Math.floor(this.id%9)+1,
      colmun:Math.floor(this.id/9)+1, 
    }
  })
}
$("#numbar>div>div").on("click",function(){
  keyUp(Number($(this).text()));
  $("#numbar").removeClass();
  $("#numbar").addClass("inputOff");  
})
window.addEventListener("keyup",function(event){
  keyUp(Number(event.key));
})
function keyUp(key){
  if(isNaN(key)||key>9||key<0)  key = "";
  game_bord[target.colmun][target.row]= key ? key:0;
  target.length=0;
  $(".select").text(key);
  $(".select").removeClass();
}

// async function auto (){
//   id= 0;
//   while(theEnd(suudoku_bord_Els)){
//     const colmun = Math.floor(id/9)+1;
//     const row = id%9+1;
//     const target = {
//       id: id,
//       row    : row,
//       colmun : colmun, 
//       block:Math.floor((colmun-1)/3)*3+Math.floor((row-1)/3)+1
//     }
//     num = game_bord[colmun][row]+1;
//     while(num<10){
      
//       game_bord[colmun][row] = num;
//       if(clear(target))   break;
//       else num++; 
//     }
//     if(num==10){
//       game_bord[colmun][row] = 0;
//       $(`#${id}`).text("");
//       id--;
//     }
//     else {
//       $(`#${id}`).text(num);
//       id++;
//     }
//     await stop(0); 
//   }
// }
async function auto (){
    let id = 10;
    let num = 10;
    if(!theEnd(suudoku_bord_Els)){
      i = record.length-1;
      target = record[i].target;
      id = target.id;
      game_bord[target.colmun][target.row] = 0;
      $(`#${id}`).text("");
      while(id == record[i].target.id){
        i--;
      }
      num = 1;
      record.length = i;
      
    }
    id= 0;
    while(theEnd(suudoku_bord_Els)){
  
      if(num==10){
        const min = Math.min(
          ...possible.map((arrays)=>{
            return Math.min(...arrays.map((array)=>{
              return array.length;
            }).filter((num)=>num!=0));
          })
        );
        id = 0;
        while(true){
          if(min == possible[Math.floor(id/9)+1][id%9+1].length) break;
          id++;
        }
      }
      const colmun = Math.floor(id/9)+1;
      const row = id%9+1;
      const target = {
        id: id,
        row    : row,
        colmun : colmun, 
        block:Math.floor((colmun-1)/3)*3+Math.floor((row-1)/3)+1
      }
      num = game_bord[colmun][row]+1;
      record.push({
        target: JSON.parse(JSON.stringify(target)),
        bord:JSON.parse(JSON.stringify(game_bord)),
        possible:JSON.parse(JSON.stringify(possible))
      });
      while(num<10){
        game_bord[colmun][row] = num;
        // if(!possibleNone(id,possible,game_bord)){
        //   num=10;
        //   console.log("やり直し");
        //   break;
        // }
        if(!spaseFind(possible)){
          num=10;
          console.log("やり直し");
          break;
        }
        if(clear(target))   break;
        else num++; 
      }
      if(num==10){
        game_bord[colmun][row] = 0;
        $(`#${id}`).text("");
        let i = record.length-1;
        while(id == record[i].target.id){
          i--;
        }
        id = record[i].target.id;
        possible.length = 0;
        possible.push(...record[i].possible);
        record.length = i;
      }
      else {
        $(`#${id}`).text(num);
  
        const strRow = Math.floor((row-1)/3)*3+1;
        const strcolmun = Math.floor((colmun-1)/3)*3+1;
        possible[colmun][row].length = 0;
        for(let i=1;i<10;i++){
          possible[colmun][i] = possible[colmun][i].filter(value => value!= num); 
          possible[i][row] = possible[i][row].filter(value => value!= num); 
          moveColmun = Math.floor((i-1)/3);moveRow= (i-1)%3;
          possible[strcolmun+moveColmun][strRow+moveRow] =
          possible[strcolmun+moveColmun][strRow+moveRow].filter(value=> value!=num);
        }
        num =10;
  
  
      }
  
      console.log(record)
      
      await stop(0);
      
    }
  }

const autoButton = document.querySelector(`#button-auto`);
autoButton.addEventListener("click",()=>{
  console.log("auto");
  for(id in suudoku_bord_Els){
    if(isNaN(id)) break;
    if($("#"+id).text() == "") continue;
    const colmun = Math.floor(id/9)+1;
    const row = id%9+1;
    const strRow = Math.floor((row-1)/3)*3+1;
    const strcolmun = Math.floor((colmun-1)/3)*3+1;
    possible[colmun][row].length = 0;
    num = Number($("#"+id).text());
    for(let i=1;i<10;i++){
      possible[colmun][i] = possible[colmun][i].filter(value => value!= num); 
      possible[i][row] = possible[i][row].filter(value => value!= num); 
      moveColmun = Math.floor((i-1)/3);moveRow= (i-1)%3;
      possible[strcolmun+moveColmun][strRow+moveRow] =
      possible[strcolmun+moveColmun][strRow+moveRow].filter(value=> value!=num);
    }
    game_bord[Math.floor(id/9)+1][id%9+1] = num;
  }
  console.log(game_bord)
  auto();
})
const startButton = document.querySelector(`#button-start`);
startButton.addEventListener("click",()=>{
  if(spaseFind()) console.log("次へ");
  else console.log("やり直し");
})
