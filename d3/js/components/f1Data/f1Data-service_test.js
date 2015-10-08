(function() {
  'use strict';

  describe('f1Data Services', function() {
    var mockQ;
    var f1DataSvc;

    beforeEach(function() {
      module(function($provide) {
        $provide.service('$q', function() {
          this.deferResolve = jasmine.createSpy('defer_resolve');
          this.defer = jasmine.createSpy('defer').and.returnValue({
            resolve: this.deferResolve,
            promise: 'expectedResult',
          });
        });
      });

      module('d3Test.f1Data');
    });

    beforeEach(inject(function($q, f1DataService) {
      mockQ = $q;
      f1DataSvc = f1DataService;
    }));

    it('should exist', function() {
      expect(f1DataSvc).toBeDefined();
    });

    it('should have category fields', function() {
      expect(f1DataSvc.categoryFields).toBeDefined();
      expect(f1DataSvc.categoryFields.length).toBeDefined();
      expect(f1DataSvc.categoryFields.length).not.toBe(0);
    });

    it('should have value fields', function() {
      expect(f1DataSvc.valueFields).toBeDefined();
      expect(f1DataSvc.valueFields.length).toBeDefined();
      expect(f1DataSvc.valueFields.length).not.toBe(0);
    });

    it('should have getData function', function() {
      expect(f1DataSvc.getData).toBeDefined();
      expect(typeof f1DataSvc.getData).toBe('function');
    });

    it('should call the defer function', function() {
      var returnValue = f1DataSvc.getData();
      expect(mockQ.defer).toHaveBeenCalled();
      expect(mockQ.deferResolve).toHaveBeenCalled();
      expect(returnValue).toBe('expectedResult');
    });
  });
})();
