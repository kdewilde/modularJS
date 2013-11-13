(function(global, name) {
	var head = document.getElementsByTagName("head")[0]; //@private | head tag cache
		loadedModulesMap = {}, //@private | map of the already loaded or loading scripts;
		namespace = null,
		config = {};

	if(name) {
		namespace = global[name] = global[name] || {};	
	} else {
		namespace = global
	}

	window.modular = window.modular || {};
	modular.config = function(cfg) {
		config = cfg;
	}

	namespace.module = function(moduleName) {
		var objects = moduleName.split('.'), //@private | example moduleName: Sin.game.Game
			module = global; //@private | internal link to the module

		for(var i = 0; i < objects.length - 1; i++) {
			//makes sure each object in the moduleName is defined or set it to an empty object.
			module = module[objects[i]] = module[objects[i]] || {};
		}

		//returns require & define functions (closure)
		return {
			require: function(modules) {
				// If files isn't an array create one
				if (!(modules instanceof Array)) {
					modules = [modules];
				}

				var defenitionCallback = null, //@private | the function to call after everything is loaded
					modulesToLoad = 0; //@private | tracks the number of modules that need to be loaded (modules.length minus already loaded modules)

				var loadModule = function (moduleName){
					var fileName = convertModuleToScript(moduleName),
						fileref=document.createElement('script');

					fileref.setAttribute("type","text/javascript");
					fileref.setAttribute("src", fileName);
					fileref.onload = fileref.onreadystatechange = function() {
						--modulesToLoad;
						if(defenitionCallback && modulesToLoad === 0) {
					    	module[objects[objects.length -1]] = defenitionCallback();
						}
					};
					if (typeof fileref!="undefined") {
						head.appendChild(fileref)
					}
				};

				var convertModuleToScript = function(module) {
					var dirs = module.split('.');
					var path = config.basePath;
					for(var i = 0; i < dirs.length; i++) {
						path += ('/' + dirs[i]);
					}
					path += '.js';
					return path;
				};

				for (var i = 0; i < modules.length; i++) {
					if(!loadedModulesMap[modules[i]]) {
						modulesToLoad++;
						loadedModulesMap[modules[i]] = true;
						loadModule(modules[i]);
					}
				}

				// set the module properties when all files required are loaded
				return {
					define: function (defenition){
						if(modulesToLoad === 0) {
							module[objects[objects.length -1]] = defenition();
						} else {
							defenitionCallback = defenition;
						}
					}
				}
			},
			// when there are no requires just apply the properties to the module
			define: function (defenitionCallback){
				if(defenitionCallback) {
					module[objects[objects.length -1]] = defenitionCallback();
				}
			}
		}
	};

	namespace.require = function(modules) {
		// If files isn't an array create one
		if (!(modules instanceof Array)) {
			modules = [modules];
		}

		var defenitionCallback = null, //@private | the function to call after everything is loaded
			modulesToLoad = 0; //@private | tracks the number of modules that need to be loaded (modules.length minus already loaded modules)

		var loadModule = function (moduleName){
			var fileName = convertModuleToScript(moduleName),
				fileref=document.createElement('script');

			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", fileName);
			fileref.onload = fileref.onreadystatechange = function() {
				--modulesToLoad;
				if(defenitionCallback && modulesToLoad === 0) {
			    	module[objects[objects.length -1]] = defenitionCallback();
				}
			};
			if (typeof fileref!="undefined") {
				head.appendChild(fileref)
			}
		};

		var convertModuleToScript = function(module) {
			var dirs = module.split('.');
			var path = config.basePath
			for(var i = 0; i < dirs.length; i++) {
				path += ('/' + dirs[i]);
			}
			path += '.js';
			return path;
		};

		for (var i = 0; i < modules.length; i++) {
			if(!loadedModulesMap[modules[i]]) {
				modulesToLoad++;
				loadedModulesMap[modules[i]] = true;
				loadModule(modules[i]);
			}
		}
	}
})(this, '');