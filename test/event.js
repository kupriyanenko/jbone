describe('jBone Event', function() {

    after(function() {
        $('#app').empty();
    });

    it('Initialized', function() {
        expect(jBone().trigger).to.be.a('function');
        expect(jBone().off).to.be.a('function');
        expect(jBone().on).to.be.a('function');
        expect(jBone().one).to.be.a('function');
    });

    it('on() off() trigger() initialized', function() {
        var a = jBone('<a>'),
            w = jBone(window),
            fn = function() {};

        a.on('click.test', fn);
        w.on('click.w', fn);

        expect(jBone.getData(a).events.click).to.have.length(1);
        expect(jBone.getData(a).events.click[0]).to.have.property('namespace', 'test');
        expect(jBone.getData(a).events.click[0]).to.have.property('originfn', fn);
        expect(jBone.getData(a).events.click[0].fn).to.be.a('function');

        expect(jBone.getData(w)).to.have.property('jid', 'window');
        expect(jBone.getData(w).events.click.length).be.above(0);
    });

    it('null or undefined handler', function() {
        jBone('<a>').on('click', null);
        jBone('<a>').on('click', undefined);
    });

    it('on(event.namespace, callback) and namespaces works correctly', function() {
        var div = jBone('<div>'),
            counter = 0;

        div.on('focusout.b', function(e) {
            counter++;
            expect(e).to.have.property('type', 'focusout');
        }).on('focusin.a', function(e) {
            counter++;
            expect(e).to.have.property('namespace', 'a');
            expect(e).to.have.property('type', 'focusin');
        });

        div.trigger('focusin.a').trigger('focusout.b');
        div.trigger('').trigger().trigger('.b').trigger('focusout.c'); // no event
        div.trigger('focusout');

        expect(counter).be.eql(3);
    });

    it('on(event, callback) with same function', function() {
        var div = jBone('<div>'),
            counter = 0,
            func = function() {
                counter++;
            };

        div.on('foo.bar', func).on('foo.zar', func);
        div.trigger('foo.bar');

        expect(counter).be.eql(1, 'Verify binding function with multiple namespaces.');

        div.off('foo.bar', func).off('foo.zar', func);
        div.trigger('foo.bar');

        expect(counter).be.eql(1, 'Verify that removing events still work.');
    });

    it('on(event, data, callback)', function() {
        var div = jBone('<div>');

        div.on('foo', {foo: 'bar'}, function(e) {
            expect(e.data.foo).be.eql('bar');
        });

        div.trigger('foo');
    });

    it('on(multiple event, callback)', function() {
        var div = jBone('<div>'), counter = 0;

        div.on('foo bar', function() {
            counter++;
        });

        div.trigger('foo');
        expect(counter).be.eql(1);

        div.trigger('bar');
        expect(counter).be.eql(2);
    });

    it('on(event, target, callback)', function() {
        var a = jBone('<div><span></span></div>'),
            counter = 0;

        jBone('#app').html(a);

        a.on('click', 'span', function() {
            counter++;
        });

        a.trigger('click');
        expect(counter).be.eql(0);

        a.find('span').trigger('click');
        expect(counter).be.eql(1);

        a.find('span').off('click').trigger('click');
        expect(counter).be.eql(2);

        a.off('click').trigger('click');
        expect(counter).be.eql(2);
    });

    it('on() with empty parameters', function() {
        var a = jBone('<div></div>'),
            counter = 0;

        jBone('#app').html(a);

        a.on('click', '', function() {
            counter++;
        });

        a.trigger('click');
        expect(counter).be.eql(1);

        counter = 0;
        a.off('click');
        a.on('click', undefined, function() {
            counter++;
        });

        a.trigger('click');
        expect(counter).be.eql(1);

        counter = 0;
        a.off('click');
        a.on('click', function() {
            counter++;
        }, undefined);

        a.trigger('click');
        expect(counter).be.eql(1);

        counter = 0;
        a.off('click');
        a.on('click', function() {
            counter++;
        }, undefined, undefined);

        a.trigger('click');
        expect(counter).be.eql(1);

        counter = 0;
        a.off('click');
        a.on('click', undefined, function() {
            counter++;
        }, undefined);

        a.trigger('click');
        expect(counter).be.eql(1);
    });

    it('on(event, target, data, callback)', function() {
        var div = jBone('<div><span></span></div>');

        div.on('foo', 'span', {foo: 'bar'}, function(e) {
            expect(e.data.foo).be.eql('bar');
        });

        div.find('span').trigger('foo');
    });

    it('on(event, target, callback) with deep nesting', function() {
        var a = jBone('<div><span class="target"><input type="text" /></span><span class="target"><input type="text" /></span></div>'),
            counter = 0;

        jBone('#app').html(a);

        a.on('click', '.target', function() {
            counter++;
        });

        a.trigger('click');
        expect(counter).be.eql(0);

        a.find('input').eq(1).trigger('click');
        expect(counter).be.eql(1);

        a.find('input').trigger('click');
        expect(counter).be.eql(3);
    });

    it('on(event, target, callback) with complex selectors', function() {
        var $div = jBone('<div class="container"><span class="target"><input type="text" /><input class="click" type="text" /></span></div>'),
            counter = 0;

        jBone('#app').html($div);

        $div.on('click', '.target > input:not(.click)', function() {
            counter++;
        });

        $div.on('click', '.target > input.click', function() {
            counter++;
        });

        $div.find('input.click').trigger('click');
        expect(counter).be.eql(1);

        $div.find('input:not(.click)').trigger('click');
        expect(counter).be.eql(2);
    });

    it('on(event, target, callback) with wrong selectors', function() {
        var $div = jBone('<div class="container"><span class="target"><i class="click"></i></span><span class="wrong" type="text"><i class="click"></i></span></div>'),
            counter = 0;

        jBone('#app').html($div);

        $div.on('click', '.wrong', function() {
            counter++;
        });

        $div.on('click', '.target', function() {
            counter++;
        });

        $div.find('.click').eq(0).trigger('click');
        expect(counter).be.eql(1);
    });

    it('on(event, target, callback) preventDefault', function() {
        var a = jBone('<div><span><p></p></span></div>');

        jBone('#app').html(a);

        a.on('click', function(e) {
            expect(e.defaultPrevented).to.not.be.ok;
            e.preventDefault();
        });

        a.on('click', 'span', function(e) {
            expect(e.defaultPrevented).be.eql(true);
        });

        a.find('span').trigger('click');
    });

    it('on() should correct works with e.stopImmediatePropagation()', function() {
        var a = jBone('<div></div>'),
            counter = 0;

        jBone('#app').html(a);

        a.on('click', function(e) {
            e.stopImmediatePropagation();
            counter++;
        });

        a.on('click', function(e) {
            counter++;
        });

        a.trigger('click');

        expect(counter).be.eql(1);
    });

    it('one(event, callback) should trigger all added events', function() {
        var div = jBone('<div>'),
            counter = 0,
            fn = function() {
                counter++;
            };

        div.one('click', fn);
        div.one('click', fn);

        div.trigger('click');

        expect(counter).be.eql(2);
    });

    it('one(event, callback)', function() {
        var div = jBone('<div>'),
            counter = 0,
            fn = function() {
                counter++;
            };

        div.one('click', fn);

        div.trigger('click').trigger('click');

        expect(counter).be.eql(1);

        var divs = jBone('<div></div><div></div>');

        divs.one('foo', fn);

        divs.eq(0).trigger('foo');

        divs.one('foo', fn);

        divs.eq(1).trigger('foo');
        divs.eq(1).trigger('foo');

        expect(counter).be.eql(4);
    });

    it('one(event, data, callback)', function() {
        var div = jBone('<div>');

        div.one('click', {foo: 'bar'}, function(e) {
            expect(e.data.foo).be.eql('bar');
        });

        div.trigger('click');
    });

    it('one(event, callback) with recursive call', function() {
        var a = jBone('<div>'), counter = 0;

        a.one('click', function() {
            counter++;
            a.one('click', function() {
                counter++;
            }).trigger('click');
        });
        a.trigger('click');

        expect(counter).be.eql(2);
    });

    it('one(event, target, callback)', function() {
        var a = jBone('<div><span></span></div>'),
            counter = 0;

        jBone('#app').html(a);

        a.one('click', 'span', function() {
            counter++;
        });

        a.trigger('click');
        expect(counter).be.eql(0);

        a.find('span').trigger('click');
        expect(counter).be.eql(1);

        a.trigger('click').find('span').trigger('click');
        expect(counter).be.eql(1);
    });

    it('one(event, target, data, callback)', function() {
        var div = jBone('<div><span></span></div>');

        div.one('foo', 'span', {foo: 'bar'}, function(e) {
            expect(e.data.foo).be.eql('bar');
        });

        div.find('span').trigger('foo');
    });

    it('one(event.namespace, callback)', function() {
        var div = jBone('<div>'),
            counter = 0;

        div.one('click.test', function(e) {
            counter++;
        });

        div.off('click.test');

        div.trigger('click');

        expect(counter).be.eql(0);
    });

    it('one(multiple event, callback)', function() {
        var div = jBone('<div>'), counter = 0;

        div.one('foo bar', function() {
            counter++;
        });

        div.trigger('foo').trigger('foo');
        expect(counter).be.eql(1);

        div.trigger('bar').trigger('bar');
        expect(counter).be.eql(2);
    });

    it('trigger() order', function() {
        var markup = jBone('<div><div><p><span><b></b></span></p></div></div>'),
            path = '';

        jBone('#app').append(markup);

        jBone('#app').find('*').on('click', function() {
            path += this.nodeName.toLowerCase() + ' ';
        });
        jBone('#app').find('b').on('click', function(e) {
            if (e.target === this) {
                jBone(this.parentNode).remove();
            }
        });

        markup.find('b').trigger('click');

        expect(path).be.eql('b p div div ');
    });

    it('trigger() on element without handlers', function() {
        var div = jBone('<div>');

        div.trigger('click');
    });

    it('trigger(multiple event)', function() {
        var div = jBone('<div>'), counter = 0,
            fn = function() {
                counter++;
            };

        div.on('foo bar', function() {
            counter++;
        });

        div.trigger('foo bar false');
        expect(counter).be.eql(2);
    });

    it('off(event, fn) undeligate current function', function() {
        var a = jBone('<a>'), counter = 0,
            fn = function() {
                counter++;
            };

        a.on('click', fn);

        a.trigger('click');
        expect(counter).be.eql(1);

        a.off('click', function() {}).trigger('click');
        expect(counter).be.eql(2);

        a.off('click', fn).trigger('click');
        expect(counter).be.eql(2);
    });

    it('off(event.namespace) namespaces works correctly', function() {
        var a = jBone('<a>'),
            counter = 0;

        a.on('click', function() {
            counter++;
        }).on('click.test', function() {
            counter++;
        });

        a.trigger('click').trigger('click');
        expect(counter).be.eql(4);

        a.off('.test');
        a.trigger('click');
        expect(counter).be.eql(5);

        a.off('click');
        a.trigger('click');
        expect(counter).be.eql(5);
    });

    it('off(event) with element without handlers', function() {
        var div = jBone('<div>');

        div.off('foo');
    });

    it('off(multiple event)', function() {
        var div = jBone('<div>'), counter = 0,
            fn = function() {
                counter++;
            };

        div.on('foo.bar bar.test test', fn);

        div.trigger('foo').trigger('bar test');
        expect(counter).be.eql(3);

        div.off('foo.bar .test test');
        div.trigger('foo').trigger('bar').trigger('test');
        expect(counter).be.eql(3);

        div.one('foo bar', fn);
        div.off('foo bar');
        div.trigger('foo bar');
        expect(counter).be.eql(3);
    });

    it('off should remove event handlers from cache', function() {
        var div = jBone('<div>'),
            fn = function() {};

        div.on('click', fn);

        expect(jBone._cache.events[jBone.getData(div).jid].click[0].originfn).be.eql(fn);

        div.off('click');

        expect(jBone._cache.events[jBone.getData(div).jid].click[0]).be.eql(undefined);

        div.on('click.test', fn);
        div.off('click', function() {});
        div.off('click.test', function() {});
        div.off('.test', function() {});
        div.off('.namespace');

        expect(jBone._cache.events[jBone.getData(div).jid].click[0]).to.be.an('object');

        div.off('.test');

        expect(jBone._cache.events[jBone.getData(div).jid].click[0]).be.eql(undefined);
    });

    it('off should remove all events', function() {
        var el = jBone('<div>').appendTo('body'),
            i = 0;

        el.on('click', function() {
            i++;
        });
        el.on('click', function() {
            i++;
        });

        el.trigger('click');

        expect(i).be.eql(2);

        el.off('click');
        el.trigger('click');

        expect(i).be.eql(2);
    });

    it('multiple on()/off() handlers per element with namespaces', function() {
        var counter = 0,
            handler = function() { counter++; },
            $el = $('<p></p>');

        $el.on('click.space1', handler);
        $el.trigger('click');
        expect(counter).be.eql(1);

        $el.on('click.space2', handler);
        $el.trigger('click');
        expect(counter).be.eql(3);

        $el.off('click.space1');
        $el.on('click.space1', handler);
        $el.trigger("click");
        expect(counter).be.eql(5);
    });

    it('Event dispather should properly handle removed events', function() {
        var a = $('<div>').appendTo('body'),
            counter = 0;

        a.on('click', function() {
            counter++;
        });
        a.on('click', function() {
            a.off();
        });
        a.on('click', function() {
            counter++;
        });

        a.trigger('click');
        expect(counter).be.eql(1);
    });

});
