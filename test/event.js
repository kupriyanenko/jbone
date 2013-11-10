describe('jBone Event', function() {

    it('Initialized', function() {
        expect(jBone().trigger).to.be.a('function');
        expect(jBone().off).to.be.a('function');
        expect(jBone().on).to.be.a('function');
    });

    it('on() off() trigger() initialized', function() {
        var a = jBone('<a>'),
            w = jBone(window),
            fn = function() {};

        a.on('click.test', fn);
        w.on('click.w', fn);

        expect(jBone._data(a).events.click).to.have.length(1);
        expect(jBone._data(a).events.click[0]).to.have.property('namespace', 'test');
        expect(jBone._data(a).events.click[0]).to.have.property('originfn', fn);
        expect(jBone._data(a).events.click[0].fn).to.be.a('function');

        expect(jBone._data(w)).to.have.property('jid', 'window');
        expect(jBone._data(w).events.click.length).be.above(0);
    });

    it('null or undefined handler', function() {
        jBone('<a>').on('click', null);
        jBone('<a>').on('click', undefined);
    });

    it('on() and namespaces works correctly', function() {
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

    it('on() with same function', function() {
        var div = jBone('<div>'), count = 0, func = function() {
            count++;
        };

        div.on('foo.bar', func).on('foo.zar', func);
        div.trigger('foo.bar');

        expect(count).be.eql(1, 'Verify binding function with multiple namespaces.');

        div.off('foo.bar', func).off('foo.zar', func);
        div.trigger('foo.bar');

        expect(count).be.eql(1, 'Verify that removing events still work.');
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

        jBone('#app').empty();
    });

    it('one(event, callback)', function() {
        var div = jBone('<div>'),
            counter = 0;

        div.one('click', function(e) {
            counter++;
        });

        div.trigger('click').trigger('click');

        expect(counter).be.eql(1);
    });

    it('one(event, target callback)', function() {
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

        jBone('#app').empty();
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

    it('trigger() order', function() {
        var markup = jBone('<div><div><p><span><b>b</b></span></p></div></div>'),
            path = '';

        jBone('#app').append(markup);

        jBone('#app').find('*').on('click', function() {
            path += this.nodeName.toLowerCase() + ' ';
        });

        markup.find('b').trigger('click');

        expect(path).be.eql('b span p div div ');

        jBone('#app').empty();
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

});
