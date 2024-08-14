//Нужный скрипт

var docWidth = window.innerWidth;
var docHeight = window.innerHeight;
var deviceSmall = docWidth < 320;
var deviceMobile = docWidth <= 480 && docWidth >= 320;
var deviceTablet = docWidth <= 768 && docWidth > 480;
var deviceLaptop = docWidth <= 1200 && docWidth > 768;
var deviceComp = docWidth <= 1920 && docWidth > 1200;
var device2K = docWidth <= 2560 && docWidth > 1920;
var device4K = docWidth <= 4096 && docWidth > 2560;
var deviceBig = docWidth > 4096;

$(document).ready(function() {
	$(window).on("resize", function() {
		docWidth = window.innerWidth;
		docHeight = window.innerHeight;
		
		deviceSmall = docWidth < 320;
		deviceMobile = docWidth <= 480 && docWidth >= 320;
		deviceTablet = docWidth <= 768 && docWidth > 480;
		deviceLaptop = docWidth <= 1200 && docWidth > 768;
		deviceComp = docWidth <= 1920 && docWidth > 1200;
		device2K = docWidth <= 2560 && docWidth > 1920;
		device4K = docWidth <= 4096 && docWidth > 2560;
		deviceBig = docWidth > 4096;
	});
});

function testFunction(num) {
	if (num !== undefined) alert("Функция успешно работает! Номер проверки -> " + num);
	else alert("Функция успешно работает!");
}

function testConsole(num) {
	if (num !== undefined) console.log("Функция успешно работает! Номер проверки -> " + num);
	else console.log("Функция успешно работает!");
}

/*
	Полный пример: [ https://kakvariant.ru/descServ.php?isTrue=true&val=0#test ]

	URL      -- Полная ссылка на текущий сайта [ https://kakvariant.ru/descServ.php?isTrue=true&val=0#test ]
	Protocol -- Протокол сайта [ https: ]
	Host     -- Имя сайта [ kakvaruant.ru ]
	Path     -- Путь к странице [ /descServ.php ]
	Values   -- Значения из URL [ ?isTrue=true&val=0 ]
	Hash     -- ID элемента, с помощью которого перемещается страница либо вверх, либо вниз [ #test ]
*/

function getURL() {return location.href;}
function getURLProtocol() {return location.protocol;}
function getURLHost() {return location.host;}
function getURLPath() {return location.pathname;}
function getURLValues() {return location.search;}
function getURLHash() {return location.hash;}

function isURL(url) {return location.href == url;}
function isURLProtocol(pr) {return location.protocol == pr;}
function isURLHost(host) {return location.host == host;}
function isURLPath(path) {return location.pathname == path;}
function isURLValues(vals) {return location.search == vals;}
function isURLHash(hash) {return location.hash == hash;}

function setURL(url) {location.href = url;}
function setURLProtocol(pr) {location.protocol = pr;}
function setURLHost(host) {location.host = host;}
function setURLPath(path) {location.pathname = path;}
function setURLValues(vals) {location.search = vals;}
function setURLHash(hash) {location.hash = hash;}


//Главный скрипт
$(document).ready(() => {
	start();
});

function start() {
	console.log(getURLPath());

	if (isURLPath("/")) {
		check();

		function check() {
			if ($("#logined").is("[placeholder=hide]")) {
				if ($(window).scrollTop() > docHeight)
					$(".h").removeClass("video");
				else
					$(".h").addClass("video");
			} else {
				$(".h").removeClass("video");

				let wCont = $(".cont").width();
				let wBlock = $(".block").width();
				let halfBlock = wBlock / 2;
				let halfCont = wCont / 2;
				let total = halfCont - halfBlock;

				$(".block").eq(0).css("margin-left", "" + total + "px");
			}
		}

		$(window).scroll(e => check());
	} else if (isURLPath("/pages/Manicen.html") || isURLPath("/pages/Manicen.php")) {
		let clothes = ["Косуха"];
		let clothed = true;

		for (let i = 0; i < clothes.length; i++) {
			$("#list").text(clothes[i]);
			$("#choice").append(`<option value="${clothes[i]}">${clothes[i]}</option>`);
		}

		$("#clothes").click(e => {
			if (clothes.length != 0) {
				if (!clothed) {
					$("#body").addClass("show");
					clothed = true;
				} else {
					$("#body").removeClass("show");
					clothed = false;
				}
			}
			
		});

		$("#remove").click(e => {
			if (clothes.length == 0)
				return;

			let s = clothes.indexOf($("#choice").prop("selectedIndex"));
			$("#choice").empty();
			$("#list").empty();
			clothes.length = 0;
			$("#body").removeClass("show");
			clothed = false;
		});
	} else if (isURLPath("/pages/auth/reg.html") || isURLPath("/pages/auth/reg.php")) {
		$("button[name=btn-reg]").click(e => {
			let regul = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z0-9]{2,4}$/i;

			if ($("#email").val().length == 0) {
				showErrMessage("Вы не указали почту!");

				return false;
			} else if (!regul.test($("#email").val())) {	
				showErrMessage("Почта указана неверно!");

				return false;
			}

			regul = /^[А-ЯЁ]{1}[а-яё]*$/;

			if ($("#name").val().length < 2) {
				showErrMessage("Имя должно быть больше 2-х символов!");

				return false;
			} else if ($("#name").val().length > 30) {
				showErrMessage("Имя должно быть меньше 30-и символов!");

				return false;
			} else if (!regul.test($("#name").val())) {
				showErrMessage("В имени указаны некорректные символы!");

				return false;
			}

			if ($("#password").val().length < 8) {
				showErrMessage("Пароль должен иметь не менее 8 символов!");

				return false;
			} else if ($("#password").val() !== $("#repeat").val()) {
				showErrMessage("Пароли не совпадают!");

				return false;
			}

			hideErr();
			return true;
		});

		function showErrMessage(message) {
			$(".err").removeClass("hide");
			$(".err").text(message);
			$("#form-reg").removeClass("margin");
		}

		function hideErr() {
			$(".err").addClass("hide");
			$(".err").text("Ошибка!");
			$("#form-reg").addClass("margin");
		}

		if (isURLValues("?err=exist")) {
			showErrMessage("Эта почта существует!");

			return false;
		}
	} else if (isURLPath("/pages/auth/login.html") || isURLPath("/pages/auth/login.php")) {
		$("button[name=btn-login]").click(e => {
			let regul = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z0-9]{2,4}$/i;

			if ($("#email").val().length == 0) {
				showErrMessage("Вы не указали почту!");

				return false;
			} else if (!regul.test($("#email").val())) {	
				showErrMessage("Почта указана неверно!");

				return false;
			}

			if ($("#password").val().length < 8) {
				showErrMessage("Пароль должен иметь не менее 8 символов!");

				return false;
			}

			hideErr();
			return true;
		});

		function showErrMessage(message) {
			$(".err").removeClass("hide");
			$(".err").text(message);
			$("#form-login").removeClass("margin");
		}

		function hideErr() {
			$(".err").addClass("hide");
			$(".err").text("Ошибка!");
			$("#form-login").addClass("margin");
		}

		if (isURLValues("?err=true")) {
			showErrMessage("Такого пользователя не существует или неправильный пароль!");

			return false;
		}
	} else if (isURLPath("/index2.html")) {
		let wCont = $(".cont").width();
		let wBlock = $(".block").width();
		let halfBlock = wBlock / 2;
		let halfCont = wCont / 2;
		let total = halfCont - halfBlock;

		$(".block").eq(0).css("margin-left", "" + total + "px");
	} else if (isURLPath("/pages/catalog.html") || isURLPath("/pages/catalog.php")) {
		let inChildren = false;
		let isMen = true;

		let hMO = $(".area-person.men > .categories.old").height();
		let hMC = $(".area-person.men > .categories.child").height() - 3;
		let hWO = $(".area-person.women > .categories.old").height();
		let hWC = $(".area-person.women > .categories.child").height() - 3;
		let wCont = $(".cont > .wrap").width();

		$(".area-person.men").height(hMO);
		$(".area-person.women").height(0);
		$(".categories").css("min-height", "100%");

		$("#for-children").click(onChildren);
		$("#for-women").click(onWomen);
		$("#for-girl").click(onGirl);
		$("#for-men").click(onMen);
		$("#for-boy").click(onBoy);

		function onChildren(e) {
			if (!inChildren) {
				$(".children").addClass("here");
				$(".person").addClass("is-children");

				if (isMen) {
					$(".area-person.men > .categories.old").css("margin-top", (-hMC - 3) + "px");
					$(".area-person.men").height(hMC);
				} else {
					$(".area-person.women > .categories.old").css("margin-top", (-hWC - 3) + "px");
					$(".area-person.women").css("margin-top", -3 + "px");
					$(".area-person.women").height(hWC);
				}
			} else {
				$(".children").removeClass("here");
				$(".person").removeClass("is-children");

				if (isMen) {
					$(".area-person.men > .categories.old").css("margin-top", "0px");
					$(".area-person.men").height(hMO);
				} else {
					$(".area-person.women > .categories.old").css("margin-top", "0px");
					$(".area-person.women").css("margin-top", "0px");
					$(".area-person.women").height(hWO);
				}
			}

			inChildren = !inChildren;
		}

		function onWomen(e) {
			if (!isMen)
				return;

			$(".area-person.men").height(0);
			$(".area-person.women").height(hWO);
			$(".area-person.women > .categories.old").css("margin-top", "0px");
			$("#for-women").addClass("here");
			$("#for-girl").addClass("here");
			$("#for-men").removeClass("here");
			$("#for-boy").removeClass("here");
			$(".area-gender").css("margin-left", -wCont + "px");

			isMen = false;
		}

		function onGirl(e) {
			if (!isMen)
				return;

			$(".area-person.men").height(0);
			$(".area-person.women").height(hWC);
			$(".area-person.women > .categories.old").css("margin-top", (-hWC - 3) + "px");
			$(".area-person.women").css("margin-top", -3 + "px");
			$("#for-women").addClass("here");
			$("#for-girl").addClass("here");
			$("#for-men").removeClass("here");
			$("#for-boy").removeClass("here");
			$(".area-gender").css("margin-left", -wCont + "px");

			isMen = false;
		}

		function onMen(e) {
			if (isMen)
				return;

			$(".area-person.women").height(0);
			$(".area-person.men").height(hMO);
			$(".area-person.men > .categories.old").css("margin-top", "0px");
			$("#for-men").addClass("here");
			$("#for-boy").addClass("here");
			$("#for-women").removeClass("here");
			$("#for-girl").removeClass("here");
			$(".area-gender").css("margin-left", "0px");

			isMen = true;
		}

		function onBoy(e) {
			if (isMen)
				return;

			$(".area-person.women").height(0);
			$(".area-person.men").height(hMC);
			$(".area-person.men > .categories.old").css("margin-top", (-hMC - 3) + "px");
			$(".area-person.women").css("margin-top", "0px");
			$("#for-men").addClass("here");
			$("#for-boy").addClass("here");
			$("#for-women").removeClass("here");
			$("#for-girl").removeClass("here");
			$(".area-gender").css("margin-left", "0px");

			isMen = true;
		}
	}
}