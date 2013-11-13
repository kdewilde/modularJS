describe("Modular", function() {
	var basePath = window.__karma__ ? 'base/test' : 'test'; // if test are run using karma set basePath to 'base/test'

	modular.config({
		basePath: basePath
	});

	describe("require", function() {
		it("requiring a module", function() {
			runs(function(){
				require('Modular.test.Foo');
			})

			waitsFor(function() {
				if(window.Modular && Modular.test && Modular.test.Foo)
					return true;
			}, "Modular.test.Foo should have loaded", 1000);

			runs(function(){
				expect(Modular.test.Foo.type).toBe('Foo');
			})
		});

		it("requiring a module that is already required", function() {
			require('Modular.test.Foo');

			expect(Modular.test.Foo.type).toBe('Foo');
		});
	});

	describe("module.define", function() {
		it("create module and define it", function() {
			module('Modular.test.Module').define(function(){
				return {
					type: 'Module'
				}
			});

			expect(Modular.test.Module.type).toBe('Module');
		});
	});

	describe("module.require.define", function() {
		it("create module and requiring a module should work", function() {
			
			runs(function(){
				module('Modular.test.Jasmine').require('Modular.test.Bar').define(function(){
					return {
						type: 'Jasmine'
					}
				});
			})

			waitsFor(function() {
				if(window.Modular && Modular.test && Modular.test.Jasmine)
					return true;
			}, "Modular.test.Jasmine should have loaded", 100);

			runs(function(){
				expect(Modular.test.Bar.type).toBe('Bar');
				expect(Modular.test.Jasmine.type).toBe('Jasmine');
			})
		});

		it("create module and requiring an already required module should work", function() {
			
			runs(function(){
				module('Modular.test.Tea').require('Modular.test.Bar').define(function(){
					return {
						type: 'Tea'
					}
				});
			})

			waitsFor(function() {
				if(Modular.test && Modular.test.Tea)
					return true;
			}, "Modular.test.Tea should have loaded", 100);

			runs(function(){
				expect(Modular.test.Bar.type).toBe('Bar');
				expect(Modular.test.Tea.type).toBe('Tea');
			})
		});
	});
});