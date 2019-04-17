import Prodotto from "../../src/wbs/Prodotto";

import assert from "assert"
import expect from "expect.js"
import FiglioAlreadyExistsException from "../../src/exceptions/FiglioAlreadyExistsException";
import Reparto from "../../src/wbs/Reparto";
import RepartoAlreadyExistsException from "../../src/exceptions/RepartoAlreadyExistsException";

describe('Prodotto.class', function () {

    before(function () {
        global.t1 = new Prodotto("TEST01", "DESC", "INTERNA", 0);
        global.t2 = new Prodotto("TEST01", "ADESC", "INTERNA", 0);
        global.t3 = new Prodotto("TEST02", "BDESC", "ESTERNA", 0);
        global.r1 = new Reparto("R1", "desc0", 10);
        global.r2 = new Reparto("R2", "desc1", 5)
    });

    it('#equals()', function () {
        assert.ok(t1.equals(t2));
        assert.ok(!t1.equals(t3))
    });

    describe('#addFiglio()', function () {
        it('Existent', function () {
            t1.addFiglio(t2,1 );
            expect(() => t1.addFiglio(t2, 1)).to.throwException((e) => {
                expect(e).to.be.a(FiglioAlreadyExistsException)
            })
        });

        it('New', function () {
            t1.addFiglio(t3, 1);
            assert.ok(t3.equals(t1.figli[t1.figli.length - 1].figlio))
        });
    });

    describe('#addReparto()', function () {
        it('Existent', function () {
            t1.addReparto(r1, 1, 3);
            expect(() => t1.addReparto(r1, 1, 3)).to.throwException((e) => {
                expect(e).to.be.a(RepartoAlreadyExistsException)
            })
        });

        it('New', function () {
            t1.addReparto(r2, 2, 4);
            assert.ok(t1.reparti[r2.nome].reparto === r2)
        });
    });

    describe('#getReparto()', function () {

    })

});