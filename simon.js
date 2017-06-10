$('document').ready(function() {

  var userInput = [];
  var sequence = [];
  var btnLock = true;
  var playCount = 0;
  var score = 0;
  var ding = new Audio('bell.mp3');
  var power = false;

  var btnArray = [
  {
    name:'topLeft',
    tone:new Audio('simonSound1.mp3')
  },
  {
    name:'topRight',
    tone:new Audio('simonSound2.mp3')
  },
  {
    name:'bottomLeft',
    tone:new Audio('simonSound3.mp3')
  },
  {
    name:'bottomRight',
    tone:new Audio('simonSound4.mp3')
  }];

  var generate = function() {
    return btnArray[Math.round(Math.random()*1000)%4];
  }

  var playSeq = function () {
    btnLock = true;

    $('#'+sequence[playCount].name).css('opacity',.7);
    sequence[playCount].tone.play();
    setTimeout(function() {
      $('#'+sequence[playCount].name).css('opacity',1);
      playCount++;
      if (playCount < sequence.length)
        setTimeout(function(){
          playSeq();
        },300);
      else {
        btnLock = false;
        playCount = 0;
      }
    },300);
  }

  var win = function() {
    var flashCount = 0;
    if (flashCount < 4) {
      setTimeout(function() {flash(btnArray[flashCount].name),500});
      flashCount++;
      win();
    }
  }

  var flash = function(button) {
    $('#'+button).css('opacity', .7);
    setTimeout(function() {
      $('#'+button).css('opacity', 1);
    },1000);
  }

  $('.gmBtn').on('mousedown', function() {
    if (btnLock == false) {
      btnLock = true;
      setTimeout(function(){btnLock=false},500);
      $(this).css('opacity', .7);
      for (var i = 0; i < btnArray.length; i++)
        if ($(this).attr('ID') == btnArray[i].name) {
          btnArray[i].tone.play();
          userInput.push(btnArray[i]);
        }

        if(userInput[userInput.length-1] == sequence[userInput.length-1]) {
          if (userInput.length == sequence.length) {
            score++;
            $('.screen p').html(score);
            if (score == 15) {
              ding.play();
              win();
            }
              //reset();
            else {
              userInput = [];
              sequence.push(generate());
              console.log(sequence)
              setTimeout(function(){playSeq()},1000);
            }
          }
        }
        else {
          userInput = [];
          setTimeout(function(){playSeq()},1000);
        }

    }
    }).on('mouseup', function() {
      $(this).css('opacity', 1);
    });


  $('#startBtn').on('click', function() {
    if (power == true) {
      sequence = [];
      sequence.push(generate());
      playSeq();
    }
  })

  $('.switchBox').on('click', function() {
    if (power == false) {
      power = true;
      $('#switchLeft').css('background-color', 'black');
      $('#switchRight').css('background-color', '#3193DE');
      $('.screen p').css('color', 'red');
    }
    else {
      power = false;
      $('#switchRight').css('background-color', 'black');
      $('#switchLeft').css('background-color', '#3193DE');
      $('.screen p').css('color', 'black');
    }
  })
})
