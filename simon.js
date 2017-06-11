$('document').ready(function() {

  var userInput = [];
  var sequence = [];
  var btnLock = true;
  var playCount = 0;
  var score = 0;
  var ding = new Audio('bell.mp3');
  var buzz = new Audio('buzzer.mp3');
  var power = false;
  var strict = false;

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
    if (power == true) {
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
          $('.gmBtn').css('cursor','pointer');
          playCount = 0;
          btnLock = false;
        }
      },300);
    }
  }

  var win = function() {
      $('.screen p').css('color', 'black');
      $('.screen p').html('$$');
      setTimeout(function(){
        $('.screen p').css('color', 'red');
        setTimeout(function(){
          $('.screen p').css('color', 'black');
          setTimeout(function(){
            $('.screen p').css('color', 'red');
            setTimeout(function(){
              $('.screen p').css('color', 'black');
              $('.screen p').html(score);
              setTimeout(function(){
                $('.screen p').css('color', 'red');
                reset();
              },200);
            },600);
          },200);
        },200);
      },200);
    }


  var flash = function(button) {
    $('#'+button).css('opacity', .7);
    setTimeout(function() {
      $('#'+button).css('opacity', 1);
    },1000);
  }

  var reset = function() {
    userInput = [];
    sequence = [];
    btnLock = true;
    playCount = 0;
    score = 0;
    $('.screen p').css('color', 'black');
    $('.screen p').html('--');
    setTimeout(function(){
      $('.screen p').css('color', 'red');
      setTimeout(function(){
        $('.screen p').css('color', 'black');
        setTimeout(function(){
          $('.screen p').css('color', 'red');
        },200);
      },200);
    },200);
  }

  $('.gmBtn').on('mousedown', function() {
    if (btnLock == false) {

      $(this).css('opacity', .7);

      for (var i = 0; i < btnArray.length; i++)
        if ($(this).attr('ID') == btnArray[i].name) {
          userInput.push(btnArray[i]);
          btnArray[i].tone.play();
        }

        if(userInput[userInput.length-1] == sequence[userInput.length-1]) {
          if (userInput.length == sequence.length) {
            score++;
            $('.screen p').html(score);
            if (score == 20) {
              ding.play();
              win();
            }
            else {
              btnLock = true;
              userInput = [];
              sequence.push(generate());
              setTimeout(function(){playSeq()},1000);
            }
          }
        }
        else {
          btnLock = true;
          buzz.play();
          $('.screen p').css('color', 'black');
          $('.screen p').html('!!');
          setTimeout(function(){
            $('.screen p').css('color', 'red');
            setTimeout(function(){
              $('.screen p').css('color', 'black');
              setTimeout(function(){
                $('.screen p').css('color', 'red');
                setTimeout(function(){
                  $('.screen p').css('color', 'black');
                  $('.screen p').html(score);
                  setTimeout(function(){
                    $('.screen p').css('color', 'red');
                  },200);
                },600);
              },200);
            },200);
          },200);
          userInput = [];
          if (strict == true) {
            sequence = [];
            score = 0;
            $('.screen p').html(score);
            sequence.push(generate());
          }
          setTimeout(function(){
            playSeq()},1500);
        }

    }
    }).on('mouseup', function() {
      $(this).css('opacity', 1);
    });


  $('#startBtn').on('click', function() {
    if (power == true) {
      reset();
      sequence.push(generate());
      setTimeout(function(){
        playSeq();
      },1000);
    }
  })

  $('#strictBtn').on('click', function() {
    if (power == true) {
      if (strict == false) {
        $('#strictIndc').css('background-color', 'red')
        strict = true;
      }
      else {
        $('#strictIndc').css('background-color', 'black')
        strict = false;
      }
    }
  })

  $('.switchBox').on('click', function() {
    if (power == false) {
      power = true;
      $('#switchLeft').css('background-color', 'black');
      $('#switchRight').css('background-color', '#3193DE');
      $('.screen p').css('color', 'red');
      strict = false;
      $('.screen p').html('--');
    }
    else {
      power = false;
      $('#switchRight').css('background-color', 'black');
      $('#switchLeft').css('background-color', '#3193DE');
      $('.screen p').css('color', 'black');
      strict = false;
    }
  })
})
