modularJS
=========

A simple &amp; lightweight replacement for RequireJS.

# How to use

Add the following rule to your project

	<script type="text/javascript" src="source/Modular.js"></script>

From here you can do 3 things

	module().define();
	require();
	module().require().define();

## module(String).define(Object/Function);

	module('Sin.class.Class').define(function(){
		var private = "i'm private",
			public = "i'm public"
		
		return {
			type: 'Class',
			public: public
			getPrivate: function(){
				return private;
			}
		}
	});	

	console.log(Sin.class.Class.public); //output: i'm public
	console.log(Sin.class.Class.private); //output: undefined
	console.log(Sin.class.Class.getPrivate()); //output: i'm private

This snippet will instantiate the Javascript Sin.class.Class object with the return value of the define function.
So you can return an object, a function, a variable, an object instance (singleton).

## require(String/Array);

	require('Sin.input.Input');

this will load the following file **./Sin/input/Input.js** which could look like

	module('Sin.input.Input').require('Sin.class.Class').define(function(){
		var Input = Sin.class.Class.extend();
		return new Input();
	});

this will create a singleton in **Sin.input.Input**

## module(String).require(String/Array).define(Object/Function);

this is a combination of the 2 previous commands

	module('Sin.game.Game').require(['Sin.input.Input', 'Sin.class.Class']).define(function(){
		var Game = Sin.class.Class.extend();
		return Game;
	});

	new Sin.game.Game() //creates a new game

# config

	modular.config({
		basePath: 'js'
	});

set the basePath property to the directory where the module() function should start resolving to find the .js file

# scope change

if you don't want the functions to be on the window scope then change the variables passed into the anonymous function on the last line of Modular.js

	(function(global, name)})(this, 'modular');

this will make the functions available on the modular scope

	modular.module().require().define();
	modular.require();

# Building ModularJS

Build script is being worked on.

# Running Tests

When you have setup [Karma](http://karma-runner.github.io/0.10/intro/installation.html) run the following command

	karma start