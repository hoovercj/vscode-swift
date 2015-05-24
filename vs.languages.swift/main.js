/*---------------------------------------------------------
 * Copyright (C) David Owens II, owensd.io. All rights reserved.
 *--------------------------------------------------------*/
/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports", 'monaco', './language'], function (require, exports, monaco, spec) {
    
    function activate(_ctx) {
        var MODE_ID = 'swift';
        
        var ctx = {
            modelService: _ctx.modelService,
            markerService: _ctx.markerService,
            configurationService: _ctx.configurationService
        };

        monaco.Modes.registerMonarchDefinition(MODE_ID, spec.language);
      
        // Provides auto-completion of the closing items.
        monaco.Modes.ElectricCharacterSupport.register(MODE_ID, {
            brackets: [
                { tokenType: 'delimiter.curly.swift', open: '{', close: '}', isElectric: true },
                { tokenType: 'delimiter.square.swift', open: '[', close: ']', isElectric: true },
                { tokenType: 'delimiter.paren.swift', open: '(', close: ')', isElectric: true }
            ],
            docComment: { scope: 'comment.documentation', open: '/**', lineStart: ' * ', close: ' */' }
        });
    }
    
    exports.activate = activate;
});
