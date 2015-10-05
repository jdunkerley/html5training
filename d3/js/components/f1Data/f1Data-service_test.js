(function() {
  'use strict';

  describe('f1Data Services', function() {
    var mockQ;
    var f1DataSvc;

    beforeEach(function() {
      module(function($provide) {
        $provide.service('$q', function() {
          this.defer_resolve = jasmine.createSpy('defer_resolve');
          this.defer = jasmine.createSpy('defer').andReturn({
            resolve: defer_resolve,
            promise: 'expectedResult',
          });
        });
      });

      module('d3Test.f1DataServices');
    });

    beforeEach(inject(function($q, f1Data) {
      mockQ = $q;
      f1DataSvc = f1Data;
    }));

    it('should exist', function() {
      expect(f1DataSvc).toBeDefined();
    });

    it('should have value fields', function() {
      expect(f1DataSvc.valueFields).toBeDefined();
      expect(f1DataSvc.valueFields.length).toBeDefined();
      expect(f1DataSvc.valueFields.length).not.toBe(0);
    });

    it('should have getData function', function() {
      expect(f1DataSvc.getData).toBeDefined();
      expect(typeof(f1DataSvc.getData)).toBe('function');
    });

    it('should call the defer function', function() {
      f1DataSvc.getData();
      expect(mockQ.defer).toHaveBeenCalled();
    });
  });
})();
