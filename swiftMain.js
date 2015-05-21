/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports", './swiftDef', 'monaco'], function (require, exports, swiftDef, monaco) {
    monaco.Modes.registerMonarchDefinition('swift', swiftDef.language);
});
