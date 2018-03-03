$(document).ready(function() {
	$("#cube-1").hide(); //Скрываем кубы перед началом игры
	$("#cube-2").hide();
	$("#cube-3").hide();
		var n = 1; //Номер игрока
	  	$("#new").one("click", function game() { //Основаная функция
			timer(); //Запуск таймера сразу после нажатия "New Game"
  			var score = 0;
  			function RandomCube1(){ //Содаем  обычный куб случайного цвета в случайном месте
				$("#cube-1").attr({x:Math.random()*90+"%", y:Math.random()*500, fill:getRandomColor()}).show();
			}
			
			function RandomCube2(){ //Содаем  малый куб случайного цвета в случайном месте
				$("#cube-2").attr({x:Math.random()*90+"%", y:Math.random()*500, fill:getRandomColor()}).show();
			}
			
			function Cube3(){ //Содаем  большой куб черного цвета в случайном месте
				$("#cube-3").attr({x:Math.random()*90+"%", y:Math.random()*500, fill:"black"}).show();
			}
			
			RandomCube1(); //Создаем первый куб
			$("#cube-1").on("click", function() //Убираем обычный куб, получаем очко, просим содать куб
			{
				$("#cube-1").hide();
				score++;	// Счетчик очков
				$(".score").html(score);
				RandomCube1();
				if (score==20){ //При счете в 20 очков, открывается новый уровень
				RandomCube2();
				}
				if (score>10){ //При счете больше 10 очков, открывается новый уровень
				Cube3();
				}
			});	
			$("#cube-2").on("click", function() //Убирараем малый куб, получаем 2 очка, просим содать кубики
			{
				$("#cube-2").hide();
				score++;	
				score++;	
				$(".score").html(score);
				RandomCube2();
				Cube3()
				RandomCube1();;
			});	
			$("#cube-3").on("click", function() //Убирараем большой куб, теряем 2 очка, просим содать куб
			{
				$("#cube-3").hide();
				score--;	
				score--;	
				$(".score").html(score);
				Cube3();
				if (score<-5) {    //При счете ниже -5 очков игра заканчивается
					alert('You lose'); //Говорим игроку о конце игры
					document.getElementById('second').innerHTML = 0; //Записываем ник игрока
				}
			});	
				
			function getRandomColor() //Функция создает случайный шестнадцатиричный код цвета
			{
				var letters = '0123456789ABCDEF';
				var color = '#';
				for (var i = 0; i < 6; i++) 
				{
					color += letters[Math.floor(Math.random() * 16)];
				}				
				return color;
			}

			function timer() //Таймер обратного отсчета
			{
			    var second = document.getElementById('second').innerHTML;
			    if( second > 0 )	
			    {
			    	 second--; 
			    	 document.getElementById('second').innerHTML = second; //выполняем отсчет времени
			    }	else 	
			    {
			    	clearInterval(intervalID); 
			        var Name = prompt(" score: "+score+"\n\nYour Name:", ''); //Запрашиваем имя пользователя, после чего записываем его результат
			        $("#table").find('tbody') //Создаем запись в таблице
				    	.append($('<tr>')
				            .append($('<th>')
				                .attr('scope', 'row')
				                .text(n)
				            )
				            .append($('<td>')
				            	.text(Name)
				            )
				            .append($('<td>')
				            	.text(score)
				            )
				        );
					n++; //Следующий игрок
				    $("#cube-1").hide();
					$("#cube-2").hide();
					$("#cube-3").hide();
			    }
			};
			window.intervalID = setInterval(timer, 1000); //Производит вызов функции "timer" каждую секунду

			//Функция кнопки "New Game"
			$("#new").one("click", function() {
				clearInterval(intervalID);
				score = 0;
				$(".score").html(score);
				i = 0;
				document.getElementById('second').innerHTML = 60;
				$("#cube-1").hide(); 
				$("#cube-2").hide();
				$("#cube-3").hide();
				game();
			});
			
			//Функция кнопки "Restart"
			$("#restart").on("click", function restart() {
				score = 0;
				$(".score").html(score);
				i = 0;
				clearInterval(intervalID);
				document.getElementById('second').innerHTML = 60;
				$("#cube-1").hide(); 
				$("#cube-2").hide();
				$("#cube-3").hide();
				game();
			});
		});
	});
	