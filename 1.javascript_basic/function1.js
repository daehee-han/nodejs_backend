function abc(mesg) {
	var str = 'hello ';
	if (mesg)
		str += mesg;
	console.log(str);
}

function callit(func, paras)
{
	func(paras);
}

abc();

callit(abc, 'world !!');


