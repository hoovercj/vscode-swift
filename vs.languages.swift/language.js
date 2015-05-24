/*---------------------------------------------------------
 * Copyright (C) David Owens II, owensd.io. All rights reserved.
 *--------------------------------------------------------*/
/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'Swift',
        name: 'swift',
        mimeTypes: [ "text/swift" ],
        fileExtensions: [ ".swift" ],
        defaultToken: '',

        lineComment: '//',
        blockCommentStart: '/*',
        blockCommentEnd: '*/',

        autoClosingPairs: [
            ['"', '"'],
            ['\'', '\''],
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        brackets: [
            { open: '{', close: '}', token: 'delimiter.curly' },
            { open: '[', close: ']', token: 'delimiter.square' },
            { open: '(', close: ')', token: 'delimiter.parenthesis' },
            { open: '<', close: '>', token: 'delimiter.angle' }
        ],

        editorOptions: { tabSize: 4, insertSpaces: true },
        
        // TODO(owensd): Support the full range of unicode valid identifiers.
        identifier: /[a-zA-Z_]\w*/,
        
        // TODO(owensd): Support the @availability macro.
        attributes: [
            '@autoclosure', '@noescape', '@noreturn', '@NSApplicationMain', '@NSCopying', '@NSManaged',
            '@objc', '@UIApplicationMain', '@noreturn'
        ],
        accessmodifiers: [ 'public', 'private', 'internal' ],
        keywords: [
            '__COLUMN__', '__FILE__', '__FUNCTION__', '__LINE__', 'as', 'associativity', 'break', 'case',
            'class', 'continue', 'convenience', 'default', 'deinit', 'didSet', 'do', 'dynamic', 'dynamicType',
            'else', 'enum', 'extension', 'fallthrough', 'final', 'for', 'func', 'get', 'if', 'import', 'in', 'infix',
            'init', 'inout', 'internal', 'is', 'lazy', 'left', 'let', 'mutating', 'nil', 'none', 'nonmutating', 'operator',
            'optional', 'override', 'postfix', 'precedence', 'prefix', 'private', 'protocol', 'Protocol', 'public',
            'required', 'return', 'right', 'self', 'Self', 'set', 'static', 'struct', 'subscript', 'super', 'switch',
            'Type', 'typealias', 'unowned', 'var', 'weak', 'where', 'while', 'willSet', 'FALSE', 'TRUE'
        ],
        
        // TODO(owensd): Support unicode symbols.
        symbols: /[=(){}\[\].,:;@#\_&\-<>`?!+*\\\/]/,

        // TODO(owensd): These are borrowed from C#; need to validate correctness for Swift.
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

        tokenizer: {
            root: [
                { include: '@comment' },
                { include: '@attribute' },
                { include: '@literal' },
                { include: '@keyword' },
                { include: '@symbol' }
            ],
            // TODO: Support parameter name highlighting for doc comments.
            comment: [
                [ /\/\/\/.*$/, 'comment.doc' ],
                [ /\/\*\*/, 'comment.doc', '@commentdocbody' ],
                [ /\/\/.*$/, 'comment' ],
                [ /\/\*/, 'comment', '@commentbody' ]
            ],
            commentdocbody: [
                [ /\/\*/, 'comment', '@commentbody' ],
                [ /\*\//, 'comment.doc', '@pop' ],
                [ /\:[a-zA-Z]+\:/, 'comment.doc.param' ],
                [ /./, 'comment.doc' ]
            ],
            commentbody: [
                [ /\/\*/, 'comment', '@commentbody' ],
                [ /\*\//, 'comment', '@pop' ],
                [ /./, 'comment' ]
            ],
            
            attribute: [
                [ /\@@identifier/, { cases: { '@attributes': 'keyword.control', '@default': '' } } ]
            ],
            
            literal: [
                [ /"/, { token: 'string.quote', bracket: '@open', next: '@stringlit' } ],
                [ /0[b]([01]_?)+/, 'number.binary' ],
                [ /0[o]([0-7]_?)+/, 'number.octal' ],
                [ /0[x]([0-9a-fA-F]_?)+([pP][\-+](\d_?)+)?/, 'number.hex' ],
                [ /(\d_?)*\.(\d_?)+([eE][\-+]?(\d_?)+)?/, 'number.float'],
                [ /(\d_?)+/, 'number' ]
            ],
            
            stringlit: [
                [ /\\\(/, { token: 'keyword.operator', bracket: '@open', next: '@interpolatedexpression' } ],
                [ /@escapes/, 'string.escape' ],
                [ /\\./, 'string.escape.invalid' ],
                [ /"/, { token: 'string.quote', bracket: '@close', next: '@pop' } ],
                [ /./, 'string' ]
            ],
            
            interpolatedexpression: [
                [ /\(/, { token: 'keyword.operator', bracket: '@open', next: '@interpolatedexpression' } ],
                [ /\)/, { token: 'keyword.operator', bracket: '@close', next: '@pop' } ],
                { include: '@literal' },
                { include: '@keyword' },
                { include: '@symbol' }
            ],
            
            keyword: [
                [ /@identifier/, { cases: { '@keywords': 'keyword', '@default': '' } } ]
            ],
            
            symbol: [
                [ /@symbols/, 'keyword.operator' ]
            ]
        }
    };
});
