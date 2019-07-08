/*! Rappid v2.4.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2019-07-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/



// Definitions by:
// Aidan Reel <http://github.com/areel>,
// David Durman <http://github.com/DavidDurman>,
// Ewout Van Gossum <https://github.com/DenEwout>,
// Federico Caselli <https://github.com/CaselIT>,
// Chris Moran <https://github.com/ChrisMoran>
// Michael MacFadden https://github.com/mmacfadden

// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// typings: https://github.com/CaselIT/typings-jointjs

/// <reference types="backbone" />

import * as Backbone from "backbone";

export as namespace joint;

export namespace g {

    export interface PlainPoint {

        x: number;
        y: number;
    }

    export interface PlainRect {

        x: number;
        y: number;
        width: number;
        height: number;
    }

    export interface Scale {

        sx: number;
        sy: number;
    }

    export interface PrecisionOpt {

        precision?: number;
    }

    export interface SubdivisionsOpt extends PrecisionOpt {

        subdivisions?: Curve[];
    }

    export interface SegmentSubdivisionsOpt extends PrecisionOpt {

        segmentSubdivisions?: Curve[][];
    }

    export interface PathT {

        segmentIndex: number;
        value: number;
    }

    export interface Segment {

        type: SegmentType;

        isSegment: boolean;
        isSubpathStart: boolean;
        isVisible: boolean;

        nextSegment: Segment | null;
        previousSegment: Segment | null;
        subpathStartSegment: Segment | null;

        start: Point | null | never; // getter, `never` for Moveto
        end: Point | null; // getter or directly assigned

        bbox(): Rect | null;

        clone(): Segment;

        closestPoint(p: Point, opt?: SubdivisionsOpt): Point;

        closestPointLength(p: Point, opt?: SubdivisionsOpt): number;

        closestPointNormalizedLength(p: Point, opt?: SubdivisionsOpt): number;

        closestPointT(p: Point): number;

        closestPointTangent(p: Point): Line | null;

        equals(segment: Segment): boolean;

        getSubdivisions(): Curve[];

        isDifferentiable(): boolean;

        length(): number;

        lengthAtT(t: number, opt?: PrecisionOpt): number;

        pointAt(ratio: number): Point;

        pointAtLength(length: number): Point;

        pointAtT(t: number): Point;

        scale(sx: number, sy: number, origin?: PlainPoint): this;

        tangentAt(ratio: number): Line | null;

        tangentAtLength(length: number): Line | null;

        tangentAtT(t: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;
    }

    export interface SegmentTypes {

        [key: string]: Segment;
    }

    type CardinalDirection = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';

    type RectangleSide = 'left' | 'right' | 'top' | 'bottom';

    type SegmentType = 'L' | 'C' | 'M' | 'Z';

    export function normalizeAngle(angle: number): number;

    export function snapToGrid(val: number, gridSize: number): number;

    export function toDeg(rad: number): number;

    export function toRad(deg: number, over360?: boolean): number;

    class Curve {

        start: Point;
        controlPoint1: Point;
        controlPoint2: Point;
        end: Point;

        constructor(p1: PlainPoint | string, p2: PlainPoint | string, p3: PlainPoint | string, p4: PlainPoint | string);
        constructor(curve: Curve);

        bbox(): Rect;

        clone(): Curve;

        closestPoint(p: PlainPoint, opt?: SubdivisionsOpt): Point;

        closestPointLength(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointNormalizedLength(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointT(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointTangent(p: PlainPoint, opt?: SubdivisionsOpt): Line | null;

        divide(t: number): [Curve, Curve];

        endpointDistance(): number;

        equals(c: Curve): boolean;

        getSkeletonPoints(t: number): [Point, Point, Point, Point, Point];

        getSubdivisions(opt?: PrecisionOpt): Curve[];

        isDifferentiable(): boolean;

        length(opt?: SubdivisionsOpt): number;

        lengthAtT(t: number, opt?: PrecisionOpt): number;

        pointAt(ratio: number, opt?: SubdivisionsOpt): Point;

        pointAtLength(length: number, opt?: SubdivisionsOpt): Point;

        pointAtT(t: number): Point;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        tangentAt(ratio: number, opt?: SubdivisionsOpt): Line | null;

        tangentAtLength(length: number, opt?: SubdivisionsOpt): Line | null;

        tangentAtT(t: number): Line | null;

        tAt(ratio: number, opt?: SubdivisionsOpt): number;

        tAtLength(length: number, opt?: SubdivisionsOpt): number;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        toPoints(opt?: SubdivisionsOpt): Point[];

        toPolyline(opt?: SubdivisionsOpt): Polyline;

        toString(): string;

        static throughPoints(points: PlainPoint[]): Curve[];
    }

    class Ellipse {

        x: number;
        y: number;
        a: number;
        b: number;

        constructor(center: PlainPoint | string, a: number, b: number);
        constructor(ellipse: Ellipse);

        bbox(): Rect;

        center(): Point;

        clone(): Ellipse;

        containsPoint(p: PlainPoint): boolean;

        equals(ellipse: Ellipse): boolean;

        inflate(dx?: number, dy?: number): this;

        intersectionWithLine(l: Line): Point[] | null;

        intersectionWithLineFromCenterToPoint(p: PlainPoint, angle?: number): Point;

        normalizedDistance(point: PlainPoint): number;

        tangentTheta(p: PlainPoint): number;

        toString(): string;

        static fromRect(rect: PlainRect): Ellipse;
    }

    class Line {

        start: Point;
        end: Point;

        constructor(p1: PlainPoint | string, p2: PlainPoint | string);
        constructor(line: Line);
        constructor();

        bbox(): Rect;

        bearing(): CardinalDirection;

        clone(): Line;

        closestPoint(p: PlainPoint | string): Point;

        closestPointLength(p: PlainPoint | string): number;

        closestPointNormalizedLength(p: PlainPoint | string): number;

        closestPointTangent(p: PlainPoint | string): Line | null;

        equals(line: Line): boolean;

        intersect(line: Line): Point | null; // Backwards compatibility, should return an array
        intersect(rect: Rect): Point[] | null;
        intersect(ellipse: Ellipse): Point[] | null;
        intersect(polyline: Polyline): Point[] | null;
        intersect(path: Path, opt?: SegmentSubdivisionsOpt): Point[] | null;

        intersectionWithLine(l: Line): Point[] | null;

        isDifferentiable(): boolean;

        length(): number;

        midpoint(): Point;

        pointAt(t: number): Point;

        pointAtLength(length: number): Point;

        pointOffset(p: PlainPoint | string): number;

        rotate(origin: PlainPoint, angle: number): this;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint): this;

        setLength(length: number): this;

        squaredLength(): number;

        tangentAt(t: number): Line | null;

        tangentAtLength(length: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        vector(): Point;

        toString(): string;
    }

    class Path {

        segments: Segment[];

        start: Point | null; // getter
        end: Point | null; // getter

        constructor();
        constructor(pathData: string);
        constructor(segments: Segment[]);
        constructor(objects: (Line | Curve)[]);
        constructor(segment: Segment);
        constructor(line: Line);
        constructor(curve: Curve);
        constructor(polyline: Polyline);

        appendSegment(segment: Segment): void;
        appendSegment(segments: Segment[]): void;

        bbox(): Rect | null;

        clone(): Path;

        closestPoint(p: Point, opt?: SegmentSubdivisionsOpt): Point | null;

        closestPointLength(p: Point, opt?: SegmentSubdivisionsOpt): number;

        closestPointNormalizedLength(p: Point, opt?: SegmentSubdivisionsOpt): number;

        closestPointTangent(p: Point, opt?: SegmentSubdivisionsOpt): Line | null;

        equals(p: Path): boolean;

        getSegment(index: number): Segment | null;

        getSegmentSubdivisions(opt?: PrecisionOpt): Curve[][];

        insertSegment(index: number, segment: Segment): void;
        insertSegment(index: number, segments: Segment[]): void;

        intersectionWithLine(l: Line, opt?: SegmentSubdivisionsOpt): Point[] | null;

        isDifferentiable(): boolean;

        isValid(): boolean;

        length(opt?: SegmentSubdivisionsOpt): number;

        pointAt(ratio: number, opt?: SegmentSubdivisionsOpt): Point | null;

        pointAtLength(length: number, opt?: SegmentSubdivisionsOpt): Point | null;

        removeSegment(index: number): void;

        replaceSegment(index: number, segment: Segment): void;
        replaceSegment(index: number, segments: Segment[]): void;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        segmentAt(ratio: number, opt?: SegmentSubdivisionsOpt): Segment | null;

        segmentAtLength(length: number, opt?: SegmentSubdivisionsOpt): Segment | null;

        segmentIndexAt(ratio: number, opt?: SegmentSubdivisionsOpt): number | null;

        segmentIndexAtLength(length: number, opt?: SegmentSubdivisionsOpt): number | null;

        tangentAt(ratio: number, opt?: SegmentSubdivisionsOpt): Line | null;

        tangentAtLength(length: number, opt?: SegmentSubdivisionsOpt): Line | null;

        toPoints(opt?: SegmentSubdivisionsOpt): Point[][] | null;

        toPolylines(opt?: SegmentSubdivisionsOpt): Polyline[] | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;

        private closestPointT(p: Point, opt?: SegmentSubdivisionsOpt): PathT | null;

        private lengthAtT(t: PathT, opt?: SegmentSubdivisionsOpt): number;

        private pointAtT(t: PathT): Point | null;

        private tangentAtT(t: PathT): Line | null;

        private prepareSegment(segment: Segment, previousSegment?: Segment | null, nextSegment?: Segment | null): Segment;

        private updateSubpathStartSegment(segment: Segment): void;

        static createSegment(type: SegmentType, ...args: any[]): Segment;

        static parse(pathData: string): Path;

        static segmentTypes: SegmentTypes;

        static isDataSupported(pathData: string): boolean;
    }

    class Point implements PlainPoint {

        x: number;
        y: number;

        constructor(x?: number, y?: number);
        constructor(p: PlainPoint | string);

        adhereToRect(r: Rect): this;

        angleBetween(p1: PlainPoint, p2: PlainPoint) : number;

        bearing(p: Point): CardinalDirection;

        changeInAngle(dx: number, dy: number, ref: PlainPoint | string): number;

        clone(): Point;

        cross(p1: PlainPoint, p2: PlainPoint) : number;

        difference(dx?: number, dy?: number): Point;
        difference(p: PlainPoint): Point;

        distance(p: PlainPoint | string): number;

        dot(p: PlainPoint): number;

        equals(p: Point): boolean;

        lerp(p: Point, t: number): Point;

        magnitude(): number;

        manhattanDistance(p: PlainPoint): number;

        move(ref: PlainPoint | string, distance: number): this;

        normalize(length: number): this;

        offset(dx?: number, dy?: number): this;
        offset(p: PlainPoint): this;

        reflection(ref: PlainPoint | string): Point;

        rotate(origin: PlainPoint | string, angle: number): this;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        snapToGrid(gx: number, gy?: number): this;

        squaredDistance(p: PlainPoint | string): number;

        theta(p: PlainPoint | string): number;

        toJSON(): PlainPoint;

        toPolar(origin?: PlainPoint | string): this;

        toString(): string;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        update(x?: number, y?: number): this;

        vectorAngle(p: PlainPoint) : number;

        static fromPolar(distance: number, angle: number, origin?: PlainPoint | string): Point;

        static random(x1: number, x2: number, y1: number, y2: number): Point;
    }

    class Polyline {

        points: Point[];

        start: Point | null; // getter
        end: Point | null; // getter

        constructor();
        constructor(svgString: string);
        constructor(points: Point[]);

        bbox(): Rect | null;

        clone(): Polyline;

        closestPoint(p: PlainPoint | string): Point | null;

        closestPointLength(p: PlainPoint | string): number;

        closestPointNormalizedLength(p: PlainPoint | string): number;

        closestPointTangent(p: PlainPoint | string): Line | null;

        convexHull(): Polyline;

        equals(p: Polyline): boolean;

        isDifferentiable(): boolean;

        intersectionWithLine(l: Line): Point[] | null;

        length(): number;

        pointAt(ratio: number): Point | null;

        pointAtLength(length: number): Point | null;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        tangentAt(ratio: number): Line | null;

        tangentAtLength(length: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;

        static parse(svgString: string): Polyline;
    }

    class Rect implements PlainRect {

        x: number;
        y: number;
        width: number;
        height: number;

        constructor(x?: number, y?: number, width?: number, height?: number);
        constructor(r: PlainRect);

        bbox(angle?: number): Rect;

        bottomLeft(): Point;

        bottomLine(): Line;

        bottomMiddle(): Point;

        bottomRight(): Point;

        center(): Point;

        clone(): Rect;

        containsPoint(p: PlainPoint | string): boolean;

        containsRect(r: PlainRect): boolean;

        corner(): Point;

        equals(r: PlainRect): boolean;

        inflate(dx?: number, dy?: number): this;

        intersect(r: Rect): Rect | null;

        intersectionWithLine(l: Line): Point[] | null;

        intersectionWithLineFromCenterToPoint(p: PlainPoint | string, angle?: number): Point;

        leftLine(): Line;

        leftMiddle(): Point;

        maxRectScaleToFit(rect: PlainRect, origin?: PlainPoint): Scale;

        maxRectUniformScaleToFit(rect: PlainRect, origin?: PlainPoint): number;

        moveAndExpand(r: PlainRect): this;

        normalize(): this;

        offset(dx?: number, dy?: number): this;
        offset(p: PlainPoint): this;

        origin(): Point;

        pointNearestToPoint(point: PlainPoint | string): Point;

        rightLine(): Line;

        rightMiddle(): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        sideNearestToPoint(point: PlainPoint | string): RectangleSide;

        snapToGrid(gx: number, gy?: number): this;

        topLeft(): Point;

        topLine(): Line;

        topMiddle(): Point;

        topRight(): Point;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        toJSON(): PlainRect;

        toString(): string;

        union(rect: PlainRect): Rect;

        static fromEllipse(e: Ellipse): Rect;
    }

    namespace bezier {

        interface IBezierCurve {
            p0: Point;
            p1: Point;
            p2: Point;
            p3: Point;
        }

        export function curveThroughPoints(points: PlainPoint[] | Point[]): string[];

        export function getCurveControlPoints(points: PlainPoint[] | Point[]): [Point[], Point[]];

        export function getCurveDivider(
            p0: string | PlainPoint,
            p1: string | PlainPoint,
            p2: string | PlainPoint,
            p3: string | PlainPoint
        ): (t: number) => [IBezierCurve, IBezierCurve];

        export function getFirectControlPoints(rhs: number[]): number[];

        export function getInversionSolver(
            p0: PlainPoint,
            p1: PlainPoint,
            p2: PlainPoint,
            p3: PlainPoint
        ): (p: PlainPoint) => number;
    }

    namespace scale {

        export function linear(domain: [number, number], range: [number, number], value: number): number;
    }
}

export function V(
    svg: SVGElement | Vectorizer | string,
    attrs?: { [key: string]: any },
    children?: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]
): Vectorizer;

export namespace Vectorizer {

    interface RotateOptions {
        absolute?: boolean;
    }

    interface AnnotateStringOptions {
        includeAnnotationIndices?: boolean;
        offset?: number;
    }

    type TextVerticalAnchor = 'top' | 'bottom' | 'middle';

    interface TextOptions {
        eol?: string;
        x?: number | string;
        textVerticalAnchor?: TextVerticalAnchor | number | string;
        lineHeight?: number | string;
        textPath?: string | { [key: string]: any };
        annotations?: TextAnnotation[];
        includeAnnotationIndices?: boolean;
    }

    interface GetBBoxOptions {
        target?: SVGElement | Vectorizer;
        recursive?: boolean;
    }

    interface TransformOptions {
        absolute?: boolean;
    }

    interface ParseXMLOptions {
        async?: boolean;
    }

    interface TextAnnotation {
        start: number;
        end: number;
        attrs: { [key: string]: any };
    }

    // modifiable Matrix. SVGMatrix doesn't allow set on properties or a constructor.
    interface Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;
    }

    interface Sample {
        x: number;
        y: number;
        distance: number;
    }

    interface DecomposedTransformation {
        translateX: number;
        translateY: number;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        rotation: number;
    }

    interface RoundedRect extends g.PlainRect {
        'rx'?: number;
        'ry'?: number;
        'top-rx'?: number;
        'top-ry'?: number;
        'bottom-rx'?: number;
        'bottom-ry'?: number;
    }

    interface Rotation {
        angle: number;
        cx?: number;
        cy?: number;
    }

    interface Translation {
        tx: number;
        ty: number;
    }

    interface Scale {
        sx: number;
        sy: number;
    }

    interface Transform {
        value: string;
        translate: Translation;
        rotate: Rotation;
        scale: Scale;
    }

    interface QualifiedAttribute {
        ns: string | null;
        local: string;
    }
}

export class Vectorizer {

    id: string;
    node: SVGElement;

    constructor(
        el: string | SVGElement,
        attrs?: { [key: string]: any },
        children?: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]
    );

    getTransformToElement(toElem: SVGGElement | Vectorizer): SVGMatrix;

    transform(): SVGMatrix;
    transform(matrix: SVGMatrix | Vectorizer.Matrix, opt?: Vectorizer.TransformOptions): this;

    translate(): Vectorizer.Translation;
    translate(tx: number, ty?: number, opt?: Vectorizer.TransformOptions): this;

    rotate(): Vectorizer.Rotation;
    rotate(angle: number, cx?: number, cy?: number, opt?: Vectorizer.RotateOptions): this;

    scale(): Vectorizer.Scale;
    scale(sx: number, sy?: number): this;

    bbox(withoutTransformations?: boolean, target?: SVGElement | Vectorizer): g.Rect;

    getBBox(opt?: Vectorizer.GetBBoxOptions) : g.Rect;

    text(content: string, opt?: Vectorizer.TextOptions): this;

    removeAttr(name: string): this;

    attr(): { [key: string]: string };
    attr(name: string): string | null;
    attr(name: string, value: any): this;
    attr(attrs: { [key: string]: any }): this;

    normalizePath(): this;

    remove(): this;

    empty(): this;

    append(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    prepend(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    before(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    appendTo(el: SVGElement | Vectorizer) : this;

    // returns either this or Vectorizer, no point in specifying this.
    svg(): Vectorizer;

    tagName(): string;

    defs(): Vectorizer | undefined;

    clone(): Vectorizer;

    findOne(selector: string): Vectorizer | undefined;

    find(selector: string): Vectorizer[];

    children(): Vectorizer[];

    index(): number;

    findParentByClass(className: string, terminator?: SVGElement): Vectorizer | null;

    contains(el: SVGElement | Vectorizer): boolean;

    toLocalPoint(x: number, y: number): SVGPoint;

    translateCenterToPoint(p: g.PlainPoint): this;

    translateAndAutoOrient(position: g.PlainPoint, reference: g.PlainPoint, target?: SVGElement | Vectorizer): this;

    animateAlongPath(attrs: { [key: string]: any }, path: SVGElement | Vectorizer): void;

    hasClass(className: string): boolean;

    addClass(className: string): Vectorizer;

    removeClass(className: string): this;

    toggleClass(className: string, switchArg?: boolean): this;

    sample(interval?: number): Vectorizer.Sample[];

    convertToPath(): Vectorizer;

    convertToPathData(): string;

    findIntersection(ref: g.PlainPoint, target: SVGElement | Vectorizer): g.PlainPoint | undefined;

    private setAttributes(attrs: { [key: string]: any }): this;

    private setAttribute(name: string, value: string): this;

    static createSVGDocument(content: string): Document;

    static uniqueId(): string;

    static ensureId(node: SVGElement | Vectorizer): string;

    static sanitizeText(text: string): string;

    static isUndefined(value: any): boolean;

    static isString(value: any): boolean;

    static isObject(value: any): boolean;

    static isArray(value: any): boolean;

    static parseXML(data: string, opt?: Vectorizer.ParseXMLOptions): XMLDocument;

    static qualifyAttr(name: string): Vectorizer.QualifiedAttribute;

    static transformStringToMatrix(transform: string): SVGMatrix;

    static matrixToTransformString(matrix: SVGMatrix | Vectorizer.Matrix): string;

    static parseTransformString(transform: string): Vectorizer.Transform;

    static deltaTransformPoint(matrix: SVGMatrix | Vectorizer.Matrix, point: SVGPoint | g.PlainPoint): g.PlainPoint;

    static decomposeMatrix(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.DecomposedTransformation;

    static matrixToScale(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Scale;

    static matrixToRotate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Rotation;

    static matrixToTranslate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Translation;

    static isV(value: any): boolean;

    static isVElement(value: any): boolean;

    static isSVGGraphicsElement(value: any): boolean;

    static createSVGMatrix(matrix: SVGMatrix | Vectorizer.Matrix): SVGMatrix;

    static createSVGTransform(matrix?: SVGMatrix | Vectorizer.Matrix): SVGTransform;

    static createSVGPoint(x: number, y: number): SVGPoint;

    static transformRect(r: g.PlainRect, matrix: SVGMatrix): g.Rect;

    static transformPoint(p: g.PlainPoint, matrix: SVGMatrix): g.Point;

    static transformLine(p: g.Line, matrix: SVGMatrix): g.Line;

    static transformPolyline(p: g.Polyline | g.PlainPoint[], matrix: SVGMatrix): g.Polyline;

    static styleToObject(styleString: string): { [key: string]: string };

    static createSlicePathData(innerRadius: number, outRadius: number, startAngle: number, endAngle: number): string;

    static mergeAttrs(a: any, b: any): any;

    static annotateString(t: string, annotations: Vectorizer.TextAnnotation[], opt?: Vectorizer.AnnotateStringOptions): Array< string | { [key: string]: any }> ;

    static findAnnotationsAtIndex(annotations: Vectorizer.TextAnnotation[], index: number): Vectorizer.TextAnnotation[];

    static findAnnotationsBetweenIndexes(annotations: Vectorizer.TextAnnotation[], start: number, end: number): Vectorizer.TextAnnotation[];

    static shiftAnnotations(annotations: Vectorizer.TextAnnotation[], index: number, offset: number): Vectorizer.TextAnnotation[];

    static convertLineToPathData(line: string | SVGElement | Vectorizer): string;

    static convertPolygonToPathData(line: string | SVGElement | Vectorizer): string;

    static convertPolylineToPathData(line: string | SVGElement | Vectorizer): string;

    static svgPointsToPath(points: g.PlainPoint[] | SVGPoint[]): string;

    static getPointsFromSvgNode(node: SVGElement | Vectorizer): SVGPoint[];

    static convertCircleToPathData(circle: string | SVGElement | Vectorizer): string;

    static convertEllipseToPathData(ellipse: string | SVGElement | Vectorizer): string;

    static convertRectToPathData(rect: string | SVGElement | Vectorizer): string;

    static rectToPath(r: Vectorizer.RoundedRect): string;

    static normalizePathData(path: string): string;

    static toNode(el: SVGElement | Vectorizer | SVGElement[]): SVGElement;
}

export namespace dia {

    type Point = g.PlainPoint;

    type BBox = g.PlainRect;

    type Size = Pick<BBox, 'width' | 'height'>;

    type PaddingJSON = {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
    };

    type Padding = number | PaddingJSON;

    type SidesJSON = {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
        horizontal?: number;
        vertical?: number;
    }

    type Sides = number | SidesJSON;

    type OrthogonalDirection =
        'left' | 'top' | 'right' | 'bottom';

    type Direction =
        OrthogonalDirection |
        'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

    type LinkEnd =
        'source' | 'target';

    type MarkupNodeJSON = {
        tagName: string;
        selector?: string;
        groupSelector?: string;
        namespaceUri?: string;
        className?: string;
        attributes?: attributes.NativeSVGAttributes;
        style?: { [key: string]: any };
        children?: MarkupJSON;
        textContent?: string;
    }

    type MarkupJSON = MarkupNodeJSON[];

    export namespace Graph {

        interface Options {
            [key: string]: any;
        }

        interface ConnectionOptions extends Cell.EmbeddableOptions {
            inbound?: boolean;
            outbound?: boolean;
        }

        interface ExploreOptions extends ConnectionOptions {
            breadthFirst?: boolean;
        }
    }

    class Graph extends Backbone.Model {

        constructor(attributes?: any, opt?: { cellNamespace?: any, cellModel?: typeof Cell });

        addCell(cell: Cell | Cell[], opt?: { [key: string]: any }): this;

        addCells(cells: Cell[], opt?: { [key: string]: any }): this;

        resetCells(cells: Cell[], opt?: { [key: string]: any }): this;

        getCell(id: string | number | Cell): Cell;

        getElements(): Element[];

        getLinks(): Link[];

        getCells(): Cell[];

        getFirstCell(): Cell | undefined;

        getLastCell(): Cell | undefined;

        getConnectedLinks(cell: Cell, opt?: Graph.ConnectionOptions): Link[];

        disconnectLinks(cell: Cell, opt?: { [key: string]: any }): void;

        removeLinks(cell: Cell, opt?: { [key: string]: any }): void;

        translate(tx: number, ty?: number, opt?: Element.TranslateOptions): this;

        cloneCells(cells: Cell[]): { [id: string]: Cell };

        getSubgraph(cells: Cell[], opt?: Cell.EmbeddableOptions): Cell[];

        cloneSubgraph(cells: Cell[], opt?: Cell.EmbeddableOptions): { [id: string]: Cell };

        dfs(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ConnectionOptions): void;

        bfs(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ConnectionOptions): void;

        search(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ExploreOptions): void;

        getSuccessors(element: Element, opt?: Graph.ExploreOptions): Element[];

        getPredecessors(element: Element, opt?: Graph.ExploreOptions): Element[];

        isSuccessor(elementA: Element, elementB: Element): boolean;

        isPredecessor(elementA: Element, elementB: Element): boolean;

        isSource(element: Element): boolean;

        isSink(element: Element): boolean;

        getSources(): Element[];

        getSinks(): Element[];

        getNeighbors(element: Element, opt?: Graph.ConnectionOptions): Element[];

        isNeighbor(elementA: Element, elementB: Element, opt?: Graph.ConnectionOptions): boolean;

        getCommonAncestor(...cells: Cell[]): Element | undefined;

        toJSON(): any;

        fromJSON(json: any, opt?: { [key: string]: any }): this;

        clear(opt?: { [key: string]: any }): this;

        findModelsFromPoint(p: Point): Element[];

        findModelsInArea(rect: BBox, opt?: { strict?: boolean }): Element[];

        findModelsUnderElement(element: Element, opt?: {
            searchBy?: 'bottomLeft' | 'bottomMiddle' | 'center' |
                'corner' | 'leftMiddle' | 'origin' | 'rightMiddle' |
                'topMiddle' | 'topRight' | 'bbox'
        }): Element[];

        getBBox(cells?: Cell[], opt?: Cell.EmbeddableOptions): g.Rect | null;

        getCellsBBox(cells: Cell[], opt?: Cell.EmbeddableOptions): g.Rect | null;

        hasActiveBatch(name?: string | string[]): boolean;

        maxZIndex(): number;

        minZIndex(): number;

        removeCells(cells: Cell[], opt?: Cell.DisconnectableOptions): this;

        resize(width: number, height: number, opt?: { [key: string]: any }): this;

        resizeCells(width: number, height: number, cells: Cell[], opt?: { [key: string]: any }): this;

        startBatch(name: string, data?: { [key: string]: any }): this;

        stopBatch(name: string, data?: { [key: string]: any }): this;

        toGraphLib(opt?: { [key: string]: any }): any;

        fromGraphLib(glGraph: any, opt?: { [key: string]: any }): this;
    }

    // dia.Cell

    export namespace Cell {

        interface GenericAttributes<T> {
            attrs?: T;
            z?: number;
            [key: string]: any;
        }

        interface Selectors {
            [selector: string]: attributes.SVGAttributes | undefined;
        }

        interface Attributes extends GenericAttributes<Selectors> {
            [key: string]: any;
        }

        interface Constructor<T extends Backbone.Model> {
            new (opt?: { id: string }): T
        }

        interface Options {
            [key: string]: any;
        }

        interface EmbeddableOptions extends Options {
            deep?: boolean;
        }

        interface DisconnectableOptions {
            disconnectLinks?: boolean;
        }

        interface TransitionOptions extends Options {
            delay?: number;
            duration?: number;
            timingFunction?: util.timing.TimingFunction;
            valueFunction?: util.interpolate.InterpolateFunction<any>;
        }
    }

    class Cell extends Backbone.Model {

        constructor(attributes?: Cell.Attributes, opt?: Graph.Options);

        id: string | number;

        graph: Graph;

        toJSON(): any;

        remove(opt?: Cell.DisconnectableOptions): this;

        toFront(opt?: Cell.EmbeddableOptions): this;

        toBack(opt?: Cell.EmbeddableOptions): this;

        parent(): string;
        parent(parentId: string): this;

        getParentCell(): Cell | null;

        getAncestors(): Cell[];

        getEmbeddedCells(opt?: { deep?: boolean, breadthFirst?: boolean }): Cell[];

        isEmbeddedIn(cell: Cell, opt?: Cell.EmbeddableOptions): boolean;

        isEmbedded(): boolean;

        prop(key: string | string[]): any;
        prop(object: Cell.Attributes, opt?: Cell.Options): this;
        prop(key: string | string[], value: any, opt?: Cell.Options): this;

        removeProp(path: string | string[], opt?: Cell.Options): this;

        attr(key?: string): any;
        attr(object: Cell.Selectors, opt?: Cell.Options): this;
        attr(key: string, value: any, opt?: Cell.Options): this;

        clone(): Cell;
        clone(opt: Cell.EmbeddableOptions): Cell | Cell[];

        removeAttr(path: string | string[], opt?: Cell.Options): this;

        transition(path: string, value?: any, opt?: Cell.TransitionOptions, delim?: string): number;

        getTransitions(): string[];

        stopTransitions(path?: string, delim?: string): this;

        embed(cell: Cell, opt?: Graph.Options): this;

        unembed(cell: Cell, opt?: Graph.Options): this;

        addTo(graph: Graph, opt?: Graph.Options): this;

        findView(paper: Paper): CellView;

        isLink(): boolean;

        isElement(): boolean;

        startBatch(name: string, opt?: Graph.Options): this;

        stopBatch(name: string, opt?: Graph.Options): this;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Cell>;

        /**
         * @deprecated
         */
        protected processPorts(): void;
    }

    // dia.Element

    export namespace Element {

        interface GenericAttributes<T> extends Cell.GenericAttributes<T> {
            markup?: string | MarkupJSON;
            position?: Point;
            size?: Size;
            angle?: number;
            ports?: {
                groups?: { [key: string]: PortGroup},
                items?: Port[]
            }
        }

        interface Attributes extends GenericAttributes<Cell.Selectors> {
            [key: string]: any
        }

        type PositionType = string | {
            name?: string,
            args?: { [key: string]: any }
        }

        interface PortGroup {
            position?: PositionType,
            markup?: string;
            attrs?: Cell.Selectors;
            label?: {
                markup?: string;
                position?: PositionType;
            }
        }

        interface Port {
            id?: string;
            markup?: string;
            group?: string;
            attrs?: Cell.Selectors;
            args?: { [key: string]: any };
            label?: {
                markup?: string;
                position?: PositionType;
            }
            z?: number | 'auto';
        }

        interface PortPosition extends Point {
            angle: number;
        }

        interface TranslateOptions {
            restrictedArea?: BBox;
            transition?: Cell.TransitionOptions;
        }
    }

    class Element extends Cell {

        constructor(attributes?: Element.Attributes, opt?: Graph.Options);

        isElement(): boolean;

        isLink(): boolean;

        translate(tx: number, ty?: number, opt?: Element.TranslateOptions): this;

        position(opt?: { parentRelative?: boolean, [key: string]: any }): g.Point;
        position(x: number, y: number, opt?: { parentRelative?: boolean, deep?: boolean, [key: string]: any }): this;

        size(): Size;
        size(width: number, height?: number, opt?: { direction?: Direction, [key: string]: any }): this;

        resize(width: number, height: number, opt?: { direction?: Direction, [key: string]: any }): this;

        rotate(deg: number, absolute?: boolean, origin?: Point, opt?: { [key: string]: any }): this;

        angle(): number;

        scale(scaleX: number, scaleY: number, origin?: Point, opt?: { [key: string]: any }): this;

        fitEmbeds(opt?: { deep?: boolean, padding?: Padding }): this;

        getBBox(opt?: Cell.EmbeddableOptions): g.Rect;

        addPort(port: Element.Port, opt?: Cell.Options): this;

        addPorts(ports: Element.Port[], opt?: Cell.Options): this;

        removePort(port: string | Element.Port, opt?: Cell.Options): this;

        removePorts(opt?: Cell.Options): this;
        removePorts(ports: Array<Element.Port|string>, opt?: Cell.Options): this;

        hasPorts(): boolean;

        hasPort(id: string): boolean;

        getPorts(): Element.Port[];

        getPort(id: string): Element.Port;

        getPortsPositions(groupName: string): { [id: string]: Element.PortPosition };

        getPortIndex(port: string | Element.Port): number;

        portProp(portId: string, path: any, value?: any, opt?: Cell.Options): Element;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Element>;
    }

    // dia.Link

    export namespace Link {

        interface EndCellArgs {
            magnet?: string;
            selector?: string;
            port?: string;
            anchor?: anchors.AnchorJSON;
            connectionPoint?: connectionPoints.ConnectionPointJSON;
        }

        interface EndCellJSON extends EndCellArgs {
            id: number | string;
        }

        interface EndPointJSON {
            x: number;
            y: number;
        }

        interface GenericAttributes<T> extends Cell.GenericAttributes<T> {
            source?: EndCellJSON | EndPointJSON;
            target?: EndCellJSON | EndPointJSON;
            labels?: Label[];
            vertices?: Point[];
            manhattan?: boolean;
            router?: routers.Router | routers.RouterJSON;
            smooth?: boolean;
            connector?: connectors.Connector | connectors.ConnectorJSON;
        }

        interface LinkSelectors extends Cell.Selectors {
            '.connection'?: attributes.SVGPathAttributes;
            '.connection-wrap'?: attributes.SVGPathAttributes;
            '.marker-source'?: attributes.SVGPathAttributes;
            '.marker-target'?: attributes.SVGPathAttributes;
            '.labels'?: attributes.SVGAttributes;
            '.marker-vertices'?: attributes.SVGAttributes;
            '.marker-arrowheads'?: attributes.SVGAttributes;
            '.link-tools'?: attributes.SVGAttributes;
        }

        interface Attributes extends Cell.GenericAttributes<LinkSelectors> {
            [key: string]: any;
        }

        interface LabelPosition {
            distance?: number; // optional for default labels
            offset?: number | { x: number; y: number; };
            args?: LinkView.LabelOptions;
        }

        interface Label {
            markup?: string; // default labels
            position?: LabelPosition | number; // optional for default labels
            attrs?: Cell.Selectors;
            size?: Size;
        }

        interface Vertex extends Point {
            [key: string]: any;
        }
    }

    class Link extends Cell {

        markup: string;
        toolMarkup: string;
        doubleToolMarkup?: string;
        vertexMarkup: string;
        arrowHeadMarkup: string;
        labelMarkup?: string; // default label markup
        labelProps?: Link.Label; // default label props

        constructor(attributes?: Link.Attributes, opt?: Graph.Options);

        isElement(): boolean;

        isLink(): boolean;

        disconnect(): this;

        source(): Link.EndCellJSON | Link.EndPointJSON;
        source(source: Link.EndCellJSON | Link.EndPointJSON, opt?: Cell.Options): this;
        source(source: Cell, args?: Link.EndCellArgs, opt?: Cell.Options): this;

        target(): Link.EndCellJSON | Link.EndPointJSON;
        target(target: Link.EndCellJSON | Link.EndPointJSON, opt?: Cell.Options): this;
        target(target: Cell, args?: Link.EndCellArgs, opt?: Cell.Options): this;

        router(): routers.Router | routers.RouterJSON | null;
        router(router: routers.Router | routers.RouterJSON, opt?: Cell.Options): this;
        router(name: routers.RouterType, args?: routers.RouterArguments, opt?: Cell.Options): this;

        connector(): connectors.Connector | connectors.ConnectorJSON | null;
        connector(connector: connectors.Connector | connectors.ConnectorJSON, opt?: Cell.Options): this;
        connector(name: connectors.ConnectorType, args?: connectors.ConnectorArguments, opt?: Cell.Options): this;

        label(index?: number): Link.Label;
        label(index: number, label: Link.Label, opt?: Cell.Options): this;

        labels(): Link.Label[];
        labels(labels: Link.Label[]): this;

        insertLabel(index: number, label: Link.Label, opt?: Cell.Options): Link.Label[];

        appendLabel(label: Link.Label, opt?: Cell.Options): Link.Label[];

        removeLabel(index?: number, opt?: Cell.Options): Link.Label[];

        vertex(index?: number): Link.Vertex;
        vertex(index: number, vertex: Link.Vertex, opt?: Cell.Options): this;

        vertices(): Link.Vertex[];
        vertices(vertices: Link.Vertex[]): this;

        insertVertex(index: number, vertex: Link.Vertex, opt?: Cell.Options): Link.Vertex[];

        removeVertex(index?: number, opt?: Cell.Options): Link.Vertex[];

        reparent(opt?: Cell.Options): Element;

        getSourceElement(): null | Element;

        getTargetElement(): null | Element;

        hasLoop(opt?: Cell.EmbeddableOptions): boolean;

        getRelationshipAncestor(): undefined | Element;

        isRelationshipEmbeddedIn(cell: Cell): boolean;

        applyToPoints(fn: (p: Point) => Point, opt?: Cell.Options): this;

        scale(sx: number, sy: number, origin?: Point, opt?: Cell.Options): this;

        translate(tx: number, ty: number, opt?: Cell.Options): this;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Link>;
    }

    // dia.CellView

    export namespace CellView {

        interface Options<T extends Cell> extends mvc.ViewOptions<T> {
            id?: string
        }

        interface InteractivityOptions extends ElementView.InteractivityOptions, LinkView.InteractivityOptions {

        }
    }

    abstract class CellViewGeneric<T extends Cell> extends mvc.View<T> {

        constructor(opt?: CellView.Options<T>);

        highlight(el?: SVGElement | JQuery | string, opt?: { [key: string]: any }): this;

        unhighlight(el?: SVGElement | JQuery | string, opt?: { [key: string]: any }): this;

        can(feature: string): boolean;

        findMagnet(el: SVGElement | JQuery | string): SVGElement | undefined;

        findBySelector(selector: string, root?: SVGElement | JQuery | string): JQuery;

        getSelector(el: SVGElement, prevSelector?: string): string;

        getStrokeBBox(el?: SVGElement): g.Rect;

        notify(eventName: string, ...eventArguments: any[]): void;

        addTools(tools: dia.ToolsView): this;

        hasTools(name?: string): boolean;

        removeTools(): this;

        showTools(): this;

        hideTools(): this;

        updateTools(opt?: { [key: string]: any }): this;

        protected onToolEvent(eventName: string): void;

        protected pointerdblclick(evt: JQuery.Event, x: number, y: number): void;

        protected pointerclick(evt: JQuery.Event, x: number, y: number): void;

        protected contextmenu(evt: JQuery.Event, x: number, y: number): void;

        protected pointerdown(evt: JQuery.Event, x: number, y: number): void;

        protected pointermove(evt: JQuery.Event, x: number, y: number): void;

        protected pointerup(evt: JQuery.Event, x: number, y: number): void;

        protected mouseover(evt: JQuery.Event): void;

        protected mouseout(evt: JQuery.Event): void;

        protected mouseenter(evt: JQuery.Event): void;

        protected mouseleave(evt: JQuery.Event): void;

        protected mousewheel(evt: JQuery.Event, x: number, y: number, delta: number): void;

        protected onevent(evt: JQuery.Event, eventName: string, x: number, y: number): void;

        protected onmagnet(evt: JQuery.Event, x: number, y: number): void;

        static dispatchToolsEvent(paper: dia.Paper, eventName: string): void;
    }

    class CellView extends CellViewGeneric<Cell> {

    }

    // dia.ElementView


    export namespace ElementView {

        interface InteractivityOptions {
            elementMove?: boolean;
            addLinkFromMagnet?: boolean;
        }
    }

    class ElementView extends CellViewGeneric<Element> {

        getBBox(opt?: { useModelGeometry?: boolean }): g.Rect;

        getNodeBBox(magnet: SVGElement): g.Rect;

        getNodeUnrotatedBBox(magnet: SVGElement): g.Rect;

        update(element: Element, renderingOnlyAttrs?: { [key: string]: any }): void;

        setInteractivity(value: boolean | ElementView.InteractivityOptions): void;

        getDelegatedView(): ElementView | null;

        protected renderMarkup(): void;

        protected renderJSONMarkup(markup: MarkupJSON): void;

        protected renderStringMarkup(markup: string): void;

        protected dragStart(evt: JQuery.Event, x: number, y: number): void;

        protected dragMagnetStart(evt: JQuery.Event, x: number, y: number): void;

        protected drag(evt: JQuery.Event, x: number, y: number): void;

        protected dragMagnet(evt: JQuery.Event, x: number, y: number): void;

        protected dragEnd(evt: JQuery.Event, x: number, y: number): void;

        protected dragMagnetEnd(evt: JQuery.Event, x: number, y: number): void;

        protected dragLinkStart(evt: JQuery.Event, magnet: SVGElement, x: number, y: number): void;

        protected addLinkFromMagnet(magnet: SVGElement, x: number, y: number): LinkView;
    }

    // dia.LinkView


    export namespace LinkView {

        interface InteractivityOptions {
            vertexAdd?: boolean,
            vertexMove?: boolean,
            vertexRemove?: boolean;
            arrowheadMove?: boolean;
            labelMove?: boolean;
            useLinkTools?: boolean;
        }

        interface GetConnectionPoint {
            (
                linkView: LinkView,
                view: ElementView,
                magnet: SVGElement,
                reference: Point,
                end: LinkEnd
            ): Point;
        }

        interface LabelOptions extends Cell.Options {
            absoluteDistance?: boolean;
            reverseDistance?: boolean;
            absoluteOffset?: boolean;
        }

        interface VertexOptions extends Cell.Options {

        }
    }

    class LinkView extends CellViewGeneric<Link> {

        options: {
            shortLinkLength?: number,
            doubleLinkTools?: boolean,
            longLinkLength?: number,
            linkToolsOffset?: number,
            doubleLinkToolsOffset?: number,
            sampleInterval?: number
        };

        sendToken(token: SVGElement, duration?: number, callback?: () => void): void;
        sendToken(token: SVGElement, opt?: { duration?: number, direction?: string; connection?: string }, callback?: () => void): void;

        addLabel(coordinates: Point, opt?: LinkView.LabelOptions): number;
        addLabel(x: number, y: number, opt?: LinkView.LabelOptions): number;

        addVertex(coordinates: Point, opt?: LinkView.VertexOptions): number;
        addVertex(x: number, y: number, opt?: LinkView.VertexOptions): number;

        getConnection(): g.Path;

        getSerializedConnection(): string;

        getConnectionSubdivisions(): g.Curve[][];

        getConnectionLength(): number;

        getPointAtLength(length: number): g.Point;

        getPointAtRatio(ratio: number): g.Point;

        getTangentAtLength(length: number): g.Line;

        getTangentAtRatio(ratio: number): g.Line;

        getClosestPoint(point: Point): g.Point;

        getClosestPointLength(point: Point): number;

        getClosestPointRatio(point: Point): number;

        getLabelPosition(x: number, y: number, opt?: LinkView.LabelOptions): Link.LabelPosition;

        getLabelCoordinates(labelPosition: Link.LabelPosition): g.Point;

        getVertexIndex(x: number, y: number): number;
        getVertexIndex(point: Point): number;

        update(link: Link, attributes: any, opt?: { [key: string]: any }): this;

        setInteractivity(value: boolean | LinkView.InteractivityOptions): void;

        protected onLabelsChange(link: Link, labels: Link.Label[], opt: { [key: string]: any }): void;

        protected onToolsChange(link: Link, toolsMarkup: string, opt: { [key: string]: any }): void;

        protected onVerticesChange(link: Link, vertices: Point[], opt: { [key: string]: any }): void;

        protected onSourceChange(element: Element, sourceEnd: any, opt: { [key: string]: any }): void;

        protected onTargetChange(element: Element, targetEnd: any, opt: { [key: string]: any }): void;

        protected onlabel(evt: JQuery.Event, x: number, y: number): void;

        protected dragConnectionStart(evt: JQuery.Event, x: number, y: number): void;

        protected dragLabelStart(evt: JQuery.Event, x: number, y: number): void;

        protected dragVertexStart(evt: JQuery.Event, x: number, y: number): void;

        protected dragArrowheadStart(evt: JQuery.Event, x: number, y: number): void;

        protected dragStart(evt: JQuery.Event, x: number, y: number): void;

        protected dragConnection(evt: JQuery.Event, x: number, y: number): void;

        protected dragLabel(evt: JQuery.Event, x: number, y: number): void;

        protected dragVertex(evt: JQuery.Event, x: number, y: number): void;

        protected dragArrowhead(evt: JQuery.Event, x: number, y: number): void;

        protected drag(evt: JQuery.Event, x: number, y: number): void;

        protected dragConnectionEnd(evt: JQuery.Event, x: number, y: number): void;

        protected dragLabelEnd(evt: JQuery.Event, x: number, y: number): void;

        protected dragVertexEnd(evt: JQuery.Event, x: number, y: number): void;

        protected dragArrowheadEnd(evt: JQuery.Event, x: number, y: number): void;

        protected dragEnd(evt: JQuery.Event, x: number, y: number): void;
    }

    // dia.Paper

    export namespace Paper {

        interface GradientOptions {
            id?: string;
            type: 'linearGradient' | 'radialGradient';
            stops: Array<{
                offset: string;
                color: string;
                opacity?: number;
            }>;
        }

        interface GridOptions {
            color?: string;
            thickness?: number;
            name?: 'dot' | 'fixedDot' | 'mesh' | 'doubleMesh';
            args?: Array<{ [key: string]: any }> | { [key: string]: any };
        }

        interface BackgroundOptions {
            color?: string;
            image?: string;
            quality?: number;
            position?: Point | string;
            size?: Size | string;
            repeat?: string;
            opacity?: number;
            waterMarkAngle?: number;
        }

        type Dimension = number | string | null;

        interface Options extends mvc.ViewOptions<Graph> {
            // appearance
            width?: Dimension;
            height?: Dimension;
            origin?: Point;
            perpendicularLinks?: boolean;
            linkConnectionPoint?: LinkView.GetConnectionPoint;
            drawGrid?: boolean | GridOptions | GridOptions[];
            background?: BackgroundOptions;
            async?: boolean | { batchSize: number };
            // interactions
            gridSize?: number;
            highlighting?: { [type: string]: highlighters.HighlighterJSON };
            interactive?: ((cellView: CellView, event: string) => boolean) | boolean | CellView.InteractivityOptions
            snapLinks?: boolean | { radius: number };
            markAvailable?: boolean;
            // validations
            validateMagnet?: (cellView: CellView, magnet: SVGElement) => boolean;
            validateConnection?: (cellViewS: CellView, magnetS: SVGElement, cellViewT: CellView, magnetT: SVGElement, end: LinkEnd, linkView: LinkView) => boolean;
            restrictTranslate?: ((elementView: ElementView) => BBox) | boolean;
            multiLinks?: boolean;
            linkPinning?: boolean;
            allowLink?: ((linkView: LinkView, paper: Paper) => boolean) | null;
            // events
            guard?: (evt: JQuery.Event, view: CellView) => boolean;
            preventContextMenu?: boolean;
            preventDefaultBlankAction?: boolean;
            clickThreshold?: number;
            moveThreshold?: number;
            magnetThreshold?: number | string;
            // views
            elementView?: typeof ElementView | ((element: Element) => typeof ElementView);
            linkView?: typeof LinkView | ((link: Link) => typeof LinkView);
            // embedding
            embeddingMode?: boolean;
            findParentBy?: 'bbox' | 'center' | 'origin' | 'corner' | 'topRight' | 'bottomLeft';
            validateEmbedding?: (childView: ElementView, parentView: ElementView) => boolean;
            // default views, models & attributes
            cellViewNamespace?: any;
            highlighterNamespace?: any;
            defaultLink?: ((cellView: CellView, magnet: SVGElement) => Link) | Link;
            defaultRouter?: routers.Router | routers.RouterJSON;
            defaultConnector?: connectors.Connector | connectors.ConnectorJSON;
            defaultAnchor?: anchors.AnchorJSON  | anchors.Anchor;
            defaultConnectionPoint?: connectionPoints.ConnectionPointJSON | connectionPoints.ConnectionPoint
            // connecting
            connectionStrategy?: connectionStrategies.ConnectionStrategy;
        }

        interface ScaleContentOptions {
            padding?: number;
            preserveAspectRatio?: boolean;
            minScale?: number;
            minScaleX?: number;
            minScaleY?: number;
            maxScale?: number;
            maxScaleX?: number;
            maxScaleY?: number;
            scaleGrid?: number;
            fittingBBox?: BBox;
        }

        interface FitToContentOptions {
            gridWidth?: number;
            gridHeight?: number;
            padding?: Padding;
            allowNewOrigin?: 'negative' | 'positive' | 'any';
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
        }
    }

    class Paper extends mvc.View<Graph> {

        constructor(opt: Paper.Options);

        options: Paper.Options;
        svg: SVGElement;
        viewport: SVGGElement;
        defs: SVGDefsElement;

        matrix(): SVGMatrix;
        matrix(ctm: SVGMatrix | Vectorizer.Matrix): this;

        clientMatrix(): SVGMatrix;

        clientOffset(): g.Point;

        pageOffset(): g.Point;

        clientToLocalPoint(x: number, y: number): g.Point;
        clientToLocalPoint(point: Point): g.Point;

        clientToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        clientToLocalRect(rect: BBox): g.Rect;

        localToClientPoint(x: number, y: number): g.Point;
        localToClientPoint(point: Point): g.Point;

        localToClientRect(x: number, y: number, width: number, height: number): g.Rect;
        localToClientRect(rect: BBox): g.Rect;

        localToPagePoint(x: number, y: number): g.Point;
        localToPagePoint(point: Point): g.Point;

        localToPageRect(x: number, y: number, width: number, height: number): g.Rect;
        localToPageRect(rect: BBox): g.Rect;

        localToPaperPoint(x: number, y: number): g.Point;
        localToPaperPoint(point: Point): g.Point;

        localToPaperRect(x: number, y: number, width: number, height: number): g.Rect;
        localToPaperRect(rect: BBox): g.Rect;

        pageToLocalPoint(x: number, y: number): g.Point;
        pageToLocalPoint(point: Point): g.Point;

        pageToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        pageToLocalRect(rect: BBox): g.Rect;

        paperToLocalPoint(x: number, y: number): g.Point;
        paperToLocalPoint(point: Point): g.Point;

        paperToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        paperToLocalRect(x: BBox): g.Rect;

        snapToGrid(x: number, y: number): g.Point;
        snapToGrid(point: Point): g.Point;

        defineFilter(filter: { [key: string]: any }): string;

        defineGradient(gradient: Paper.GradientOptions): string;

        defineMarker(marker: { [key: string]: any }): string;

        isDefined(defId: string): boolean;

        getComputedSize(): Size;

        getArea(): g.Rect;

        getRestrictedArea(): g.Rect | undefined;

        getContentArea(): g.Rect;

        getContentBBox(): g.Rect;

        findView<T extends ElementView | LinkView>(element: string | JQuery | SVGElement): T;

        findViewByModel<T extends ElementView | LinkView>(model: Cell | string | number): T;

        findViewsFromPoint(point: string | Point): ElementView[];

        findViewsInArea(rect: BBox, opt?: { strict?: boolean }): ElementView[];

        fitToContent(opt?: Paper.FitToContentOptions): void;
        fitToContent(gridWidth?: number, gridHeight?: number, padding?: number, opt?: any): void;

        scaleContentToFit(opt?: Paper.ScaleContentOptions): void;

        cancelRenderViews(): void;

        drawBackground(opt?: Paper.BackgroundOptions): this;

        drawGrid(opt?: Paper.GridOptions | Paper.GridOptions[]): this;

        clearGrid(): this;

        getDefaultLink(cellView: CellView, magnet: SVGElement): Link;

        getModelById(id: string | number | Cell): Cell;

        setDimensions(width: Paper.Dimension, height: Paper.Dimension): void;

        setGridSize(gridSize: number): this;

        setInteractivity(value: any): void;

        setOrigin(x: number, y: number): this;

        scale(): Vectorizer.Scale;
        scale(sx: number, sy?: number, ox?: number, oy?: number): this;

        translate(): Vectorizer.Translation;
        translate(tx: number, ty?: number): this;

        update(): this;

        // tools

        removeTools(): this;

        hideTools(): this;

        showTools(): this;

        // protected
        protected pointerdblclick(evt: JQuery.Event): void;

        protected pointerclick(evt: JQuery.Event): void;

        protected contextmenu(evt: JQuery.Event): void;

        protected pointerdown(evt: JQuery.Event): void;

        protected pointermove(evt: JQuery.Event): void;

        protected pointerup(evt: JQuery.Event): void;

        protected mouseover(evt: JQuery.Event): void;

        protected mouseout(evt: JQuery.Event): void;

        protected mouseenter(evt: JQuery.Event): void;

        protected mouseleave(evt: JQuery.Event): void;

        protected mousewheel(evt: JQuery.Event): void;

        protected onevent(evt: JQuery.Event): void;

        protected onmagnet(evt: JQuery.Event): void;

        protected onlabel(evt: JQuery.Event): void;

        protected guard(evt: JQuery.Event, view: CellView): boolean;

        protected sortViews(): void;

        protected drawBackgroundImage(img: HTMLImageElement, opt: { [key: string]: any }): void;

        protected createViewForModel(cell: Cell): CellView;

        protected cloneOptions(): Paper.Options;

        protected afterRenderViews(): void;

        protected asyncRenderViews(cells: Cell[], opt?: { [key: string]: any }): void;

        protected beforeRenderViews(cells: Cell[]): Cell[];

        protected init(): void;

        protected onCellAdded(cell: Cell, graph: Graph, opt: { async?: boolean, position?: number }): void;

        protected onCellHighlight(cellView: CellView, magnetEl: SVGElement, opt?: { highlighter?: highlighters.HighlighterJSON }): void;

        protected onCellUnhighlight(cellView: CellView, magnetEl: SVGElement, opt?: { highlighter?: highlighters.HighlighterJSON }): void;

        protected onRemove(): void;

        protected removeView(cell: Cell): CellView;

        protected removeViews(): void;

        protected renderView(cell: Cell): CellView;

        protected resetViews(cellsCollection: Cell[], opt: { [key: string]: any }): void;

        protected updateBackgroundColor(color: string): void;

        protected updateBackgroundImage(opt: { position?: any, size?: any }): void;
    }

    namespace ToolsView {

        interface Options {
            tools?: dia.ToolView[];
            name?: string | null;
            relatedView?: dia.CellView;
            component?: boolean;
        }
    }

    class ToolsView extends mvc.View<undefined> {

        constructor(opt?: ToolsView.Options);

        options: ToolsView.Options;

        configure(opt?: ToolsView.Options): this;

        getName(): string | null;

        focusTool(tool: ToolView): this;

        blurTool(tool: ToolView): this;

        show(): this;

        hide(): this;

        mount(): this;

        protected simulateRelatedView(el: SVGElement): void;
    }

    namespace ToolView {

        interface Options {
            focusOpacity?: number;
        }
    }

    class ToolView extends mvc.View<undefined> {

        name: string | null;
        parentView: ToolsView;
        relatedView: dia.CellView;
        paper: Paper;

        constructor(opt?: ToolView.Options);

        configure(opt?: ToolView.Options): this;

        show(): void;

        hide(): void;

        isVisible(): boolean;

        focus(): void;

        blur(): void;

        update(): void;
    }

}

export namespace shapes {

    namespace standard {

        interface RectangleSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Rectangle extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<RectangleSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface CircleSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGCircleAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Circle extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<CircleSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface EllipseSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGCircleAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Ellipse extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<EllipseSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface PathSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPathAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Path extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PathSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface PolygonSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPolygonAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Polygon extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface PolylineSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPolylineAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Polyline extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolylineSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface ImageSelectors {
            root?: attributes.SVGAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class Image extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<ImageSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface BorderedImageSelectors {
            root?: attributes.SVGAttributes;
            border?: attributes.SVGRectAttributes;
            background?: attributes.SVGRectAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class BorderedImage extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<BorderedImageSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface EmbeddedImageSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class EmbeddedImage extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<EmbeddedImageSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface InscribedImageSelectors {
            root?: attributes.SVGAttributes;
            border?: attributes.SVGEllipseAttributes;
            background?: attributes.SVGEllipseAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        class InscribedImage extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<InscribedImageSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface HeaderedRectangleSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            header?: attributes.SVGRectAttributes;
            headerText?: attributes.SVGTextAttributes;
            bodyText?: attributes.SVGTextAttributes;
        }

        class HeaderedRectangle extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<HeaderedRectangleSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface CylinderBodyAttributes extends attributes.SVGPathAttributes {
            lateralArea?: string | number;
        }

        interface CylinderSelectors {
            root?: attributes.SVGAttributes;
            body?: CylinderBodyAttributes;
            top?: attributes.SVGEllipseAttributes;
        }

        class Cylinder extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<CylinderSelectors>,
                opt?: dia.Graph.Options
            )

            topRy(): string | number;
            topRy(t: string | number, opt?: dia.Cell.Options): this;
        }

        interface TextBlockSelectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            label?: {
                text?: string;
                style?: { [key: string]: any };
                [key: string]: any;
            }
        }

        class TextBlock extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<TextBlockSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface LinkSelectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            wrapper?: attributes.SVGPathAttributes;
        }

        class Link extends dia.Link {
            constructor(
                attributes?: dia.Link.GenericAttributes<LinkSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface DoubleLinkSelectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            outline?: attributes.SVGPathAttributes;
        }

        class DoubleLink extends dia.Link {
            constructor(
                attributes?: dia.Link.GenericAttributes<DoubleLinkSelectors>,
                opt?: dia.Graph.Options
            )
        }

        interface ShadowLinkSelectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            shadow?: attributes.SVGPathAttributes;
        }

        class ShadowLink extends dia.Link {
            constructor(
                attributes?: dia.Link.GenericAttributes<ShadowLinkSelectors>,
                opt?: dia.Graph.Options
            )
        }
    }

    interface SVGTextSelector extends dia.Cell.Selectors {
        text?: attributes.SVGTextAttributes;
    }

    interface SVGRectSelector extends dia.Cell.Selectors {
        rect?: attributes.SVGRectAttributes;
    }

    interface SVGCircleSelector extends dia.Cell.Selectors {
        circle?: attributes.SVGCircleAttributes;
    }

    interface SVGEllipseSelector extends dia.Cell.Selectors {
        ellipse?: attributes.SVGEllipseAttributes;
    }

    interface SVGPolygonSelector extends dia.Cell.Selectors {
        polygon?: attributes.SVGPolygonAttributes;
    }

    interface SVGPolylineSelector extends dia.Cell.Selectors {
        polyline?: attributes.SVGPolylineAttributes;
    }

    interface SVGImageSelector extends dia.Cell.Selectors {
        image?: attributes.SVGImageAttributes;
    }

    interface SVGPathSelector extends dia.Cell.Selectors {
        path?: attributes.SVGPathAttributes;
    }

    namespace basic {

        class Generic extends dia.Element {

        }

        class Text extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGTextSelector>,
                opt?: { [key: string]: any }
            );
        }

        interface RectSelectors extends SVGTextSelector, SVGRectSelector {

        }

        class Rect extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<RectSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface CircleSelectors extends SVGTextSelector, SVGCircleSelector {

        }

        class Circle extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface EllipseSelectors extends SVGTextSelector, SVGEllipseSelector {

        }


        class Ellipse extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<EllipseSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PolygonSelectors extends SVGTextSelector, SVGPolygonSelector {

        }


        class Polygon extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PolylineSelectors extends SVGTextSelector, SVGPolylineSelector {

        }

        class Polyline extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolylineSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface ImageSelectors extends SVGTextSelector, SVGImageSelector {

        }

        class Image extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<ImageSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface PathSelectors extends SVGTextSelector, SVGPathSelector {

        }

        class Path extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PathSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Rhombus extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PathSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface TextBlockSelectors extends SVGTextSelector, SVGRectSelector {
            '.content'?: attributes.SVGTextAttributes;
        }

        class TextBlock extends Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<TextBlockSelectors>,
                opt?: { [key: string]: any }
            );
        }
    }

    namespace chess {

        class KingWhite extends basic.Generic {

        }

        class KingBlack extends basic.Generic {

        }

        class QueenWhite extends basic.Generic {

        }

        class QueenBlack extends basic.Generic {

        }

        class RookWhite extends basic.Generic {

        }

        class RookBlack extends basic.Generic {

        }

        class BishopWhite extends basic.Generic {

        }

        class BishopBlack extends basic.Generic {

        }

        class KnightWhite extends basic.Generic {

        }

        class KnightBlack extends basic.Generic {

        }

        class PawnWhite extends basic.Generic {

        }

        class PawnBlack extends basic.Generic {

        }
    }

    namespace devs {

        interface ModelSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGTextAttributes;
            '.body'?: attributes.SVGRectAttributes;
        }

        interface ModelAttributes extends dia.Element.GenericAttributes<ModelSelectors> {
            inPorts?: string[];
            outPorts?: string[];
        }

        class Model extends basic.Generic {

            constructor(attributes?: ModelAttributes, opt?: { [key: string]: any });

            changeInGroup(properties: any, opt?: any): boolean;

            changeOutGroup(properties: any, opt?: any): boolean;

            createPortItem(group: string, port: string): any;

            createPortItems(group: string, ports: string[]): any[];

            addOutPort(port: string, opt?: any): this;

            addInPort(port: string, opt?: any): this;

            removeOutPort(port: string, opt?: any): this;

            removeInPort(port: string, opt?: any): this;
        }

        class Coupled extends Model {

        }

        class Atomic extends Model {

        }

        class Link extends dia.Link {

        }
    }

    namespace erd {

        interface PolygonalSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGPolygonAttributes;
            '.body'?: attributes.SVGPolygonAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        interface EllipsoidSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGEllipseAttributes;
            '.body'?: attributes.SVGEllipseAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        class Entity extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonalSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class WeakEntity extends Entity {

        }

        class Relationship extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<PolygonalSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class IdentifyingRelationship extends Relationship {

        }

        class Attribute extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<EllipsoidSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Multivalued extends Attribute {

        }

        class Derived extends Attribute {

        }

        class Key extends Attribute {

        }

        class Normal extends Attribute {

        }

        class ISA extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.PolygonSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Line extends dia.Link {

            cardinality(value: string | number): void;
        }
    }

    namespace fsa {

        class State extends basic.Circle {

        }

        class StartState extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGCircleSelector>,
                opt?: { [key: string]: any }
            );
        }

        interface CirculoidSelectors extends dia.Cell.Selectors {
            '.outer'?: attributes.SVGCircleAttributes;
            '.inner'?: attributes.SVGCircleAttributes;
        }

        class EndState extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<CirculoidSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Arrow extends dia.Link {

        }
    }

    namespace logic {

        abstract class Gate extends basic.Generic {

        }

        interface GateSelectors extends dia.Cell.Selectors {
            '.body'?: attributes.SVGRectAttributes;
            '.wire'?: attributes.SVGPathAttributes;
            'circle'?: attributes.SVGCircleAttributes;
            'text'?: attributes.SVGTextAttributes;
        }

        class IO extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Input extends IO {

        }

        class Output extends IO {

        }

        interface Gate11Selectors extends dia.Cell.Selectors {
            '.input'?: attributes.SVGCircleAttributes;
            '.output'?: attributes.SVGCircleAttributes;
            '.body'?: attributes.SVGImageAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Gate11 extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<Gate11Selectors>,
                opt?: { [key: string]: any }
            );
        }

        interface Gate21Selectors extends dia.Cell.Selectors {
            '.input'?: attributes.SVGCircleAttributes;
            '.input1'?: attributes.SVGCircleAttributes;
            '.input2'?: attributes.SVGCircleAttributes;
            '.output'?: attributes.SVGCircleAttributes;
            '.body'?: attributes.SVGImageAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Gate21 extends Gate {
            constructor(
                attributes?: dia.Element.GenericAttributes<Gate21Selectors>,
                opt?: { [key: string]: any }
            );
        }

        class Repeater extends Gate11 {

            operation(input: any): any;
        }

        class Not extends Gate11 {

            operation(input: any): boolean;
        }

        class Or extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class And extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Nor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Nand extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Xor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Xnor extends Gate21 {

            operation(input1: any, input2: any): boolean;
        }

        class Wire extends dia.Link {

        }
    }

    namespace org {

        interface MemberSelectors extends dia.Cell.Selectors {
            '.card'?: attributes.SVGRectAttributes;
            '.rank'?: attributes.SVGTextAttributes;
            '.name'?: attributes.SVGTextAttributes;
            'image'?: attributes.SVGImageAttributes;
        }

        class Member extends dia.Element {
            constructor(
                attributes?: dia.Element.GenericAttributes<MemberSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Arrow extends dia.Link {

        }
    }

    namespace pn {

        class Place extends basic.Generic {
            constructor(attributes?: dia.Element.Attributes, opt?: { [key: string]: any });
        }

        class PlaceView extends dia.ElementView {
            renderTokens(): void;
        }

        class Transition extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<SVGRectSelector>,
                opt?: { [key: string]: any }
            );
        }

        class Link extends dia.Link {

        }
    }

    namespace uml {

        interface ClassAttributes extends dia.Element.GenericAttributes<SVGRectSelector> {
            name: string[];
            attributes: string[];
            methods: string[];
        }

        class Class extends basic.Generic {

            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });

            getClassName(): string[];

            protected updateRectangles(): void;
        }

        class ClassView extends dia.ElementView {

        }

        class Abstract extends Class {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class AbstractView extends ClassView {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class Interface extends Class {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class InterfaceView extends ClassView {
            constructor(attributes?: ClassAttributes, opt?: { [key: string]: any });
        }

        class Generalization extends dia.Link {

        }

        class Implementation extends dia.Link {

        }

        class Aggregation extends dia.Link {

        }

        class Composition extends dia.Link {

        }

        class Association extends dia.Link {

        }

        interface StateSelectors extends dia.Cell.Selectors {
            '.uml-state-body'?: attributes.SVGRectAttributes;
            '.uml-state-separator'?: attributes.SVGPathAttributes;
            '.uml-state-name'?: attributes.SVGTextAttributes;
            '.uml-state-events'?: attributes.SVGTextAttributes;
        }

        class State extends basic.Generic {

            constructor(
                attributes?: dia.Element.GenericAttributes<StateSelectors>,
                opt?: { [key: string]: any }
            );

            protected updateName(): void;

            protected updateEvents(): void;

            protected updatePath(): void;
        }

        class StartState extends basic.Circle {
            constructor(
                attributes?: dia.Element.GenericAttributes<basic.CircleSelectors>,
                opt?: { [key: string]: any }
            );
        }

        interface EndStateSelectors extends dia.Cell.Selectors {
            'circle.outer'?: attributes.SVGCircleAttributes;
            'circle.inner'?: attributes.SVGCircleAttributes;
        }

        class EndState extends basic.Generic {
            constructor(
                attributes?: dia.Element.GenericAttributes<EndStateSelectors>,
                opt?: { [key: string]: any }
            );
        }

        class Transition extends dia.Link {

        }
    }
}

// util

export namespace util {

    export function hashCode(str: string): string;

    export function getByPath(object: { [key: string]: any }, path: string | string[], delim?: string): any;

    export function setByPath(object: { [key: string]: any }, path: string | string[], value: any, delim?: string): any;

    export function unsetByPath(object: { [key: string]: any }, path: string | string[], delim?: string): any;

    export function flattenObject(object: { [key: string]: any }, delim?: string, stop?: (node: any) => boolean): any;

    export function uuid(): string;

    export function guid(obj?: { [key: string]: any }): string;

    export function toKebabCase(str: string): string;

    export function normalizeEvent(evt: JQuery.Event): JQuery.Event;

    export function nextFrame(callback: () => void, context?: { [key: string]: any }): number;

    export function cancelFrame(requestId: number): void;

    export var shapePerimeterConnectionPoint: dia.LinkView.GetConnectionPoint;

    export function isPercentage(val: any): boolean;

    export function parseCssNumeric(val: any, restrictUnits: string | string[]): { value: number; unit?: string } | null;

    export function breakText(text: string, size: { width: number; height?: number; }, attrs?: attributes.NativeSVGAttributes, opt?: {
        svgDocument?: SVGElement;
        separator?: string | any;
        eol?: string;
        ellipsis?: boolean | string;
    }): string;

    export function sanitizeHTML(html: string): string;

    export function downloadBlob(blob: Blob, fileName: string): void;

    export function downloadDataUri(dataUri: string, fileName: string): void;

    export function dataUriToBlob(dataUri: string): Blob;

    export function imageToDataUri(url: string, callback: (err: Error | null, dataUri: string) => void): void;

    export function getElementBBox(el: Element): dia.BBox;

    export function sortElements(
        elements: Element[] | string | JQuery,
        comparator: (a: Element, b: Element) => number
    ): Element[];

    export function setAttributesBySelector(el: Element, attrs: { [selector: string]: { [attribute: string]: any } }): void;

    export function normalizeSides(sides: dia.Sides): dia.PaddingJSON;

    export function template(html: string): (data: any) => string;

    export function toggleFullScreen(el?: Element): void;

    interface DOMJSONDocument {
        fragment: DocumentFragment,
        selectors: { [key: string]: Element },
        groupSelectors: { [key: string]: Element[] }
    }

    export function parseDOMJSON(json: dia.MarkupJSON): DOMJSONDocument;

    export namespace timing {

        type TimingFunction = (time: number) => number;

        export var linear: TimingFunction;
        export var quad: TimingFunction;
        export var cubic: TimingFunction;
        export var inout: TimingFunction;
        export var exponential: TimingFunction;
        export var bounce: TimingFunction;

        export function reverse(f: TimingFunction): TimingFunction;

        export function reflect(f: TimingFunction): TimingFunction;

        export function clamp(f: TimingFunction, min?: number, max?: number): TimingFunction;

        export function back(s?: number): TimingFunction;

        export function elastic(x?: number): TimingFunction;
    }

    export namespace interpolate {

        type InterpolateFunction<T> = (start: T, end: T) => ((time: number) => T);

        export var number: InterpolateFunction<number>;
        export var object: InterpolateFunction<{ [key: string]: any }>;
        export var hexColor: InterpolateFunction<string>;
        export var unit: InterpolateFunction<string>;
    }

    export namespace filter {

        interface FilterArgumentsMap {
            'outline': {
                color?: string;
                opacity?: number;
                margin?: number;
                width?: number;
            };
            'highlight': {
                color?: string;
                blur?: number;
                opacity?: number;
                width?: number;
            };
            'blur': {
                x?: number;
                y?: number;
            };
            'dropShadow': {
                dx?: number;
                dy?: number;
                opacity?: number;
                color?: string;
                blur?: number;
            };
            'grayscale': {
                amount?: number;
            };
            'sepia': {
                amount?: number;
            };
            'saturate': {
                amount?: number;
            };
            'hueRotate': {
                angle?: number;
            };
            'invert': {
                amount?: number;
            };
            'brightness': {
                amount?: number;
            };
            'contrast': {
                amount?: number;
            };
        }

        type FilterFunction<K extends keyof FilterArgumentsMap> = (args: FilterArgumentsMap[K]) => string;

        export var outline: FilterFunction<'outline'>;
        export var highlight: FilterFunction<'highlight'>;
        export var blur: FilterFunction<'blur'>;
        export var dropShadow: FilterFunction<'dropShadow'>;
        export var grayscale: FilterFunction<'grayscale'>;
        export var sepia: FilterFunction<'sepia'>;
        export var saturate: FilterFunction<'saturate'>;
        export var hueRotate: FilterFunction<'hueRotate'>;
        export var invert: FilterFunction<'invert'>;
        export var brightness: FilterFunction<'brightness'>;
        export var contrast: FilterFunction<'contrast'>;
    }

    namespace format {

        interface NumberLocale {
            currency: [string, string],
            decimal: string,
            thousands: string,
            grouping: number[]
        }

        export function number(specifier: string, value: number, locale?: NumberLocale): string;

        export function string(str: string, value: string): string;

        export function convert(type: string, value: number, precision: number): string;

        export function round(value: number, precision?: number): number

        export function precision(value: number, precision: number): number;

        export function prefix(value: number, precision: number): { scale: (d: number) => number; symbol: string; } | undefined
    }

    // LODASH FUNCTIONS:

    type NotVoid = {} | null | undefined; // the `any` type without `void` and `never`

    type Collection = object | any[]; // an object or an array

    type PropertyPath = string | string[];

    type Iteratee = IterateeFunction | IterateeShorthand;
    type IterateeFunction = (value: any) => NotVoid;
    type IterateeShorthand = PropertyPath; // there are other shorthands in Lodash but not in the methods we duplicate

    type SourceObjectsOptionalFinalCustomizer = Array<object | CustomizerFunction>; // typescript cannot express "any number of objects optionally followed by CustomizerFunction"
    type CustomizerFunction = (objValue: any, srcValue: any, key: string, object: any, source: any, stack: any) => NotVoid;

    /** @deprecated do not use */
    export function mixin(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated do not use */
    export function deepMixin(destinationObject: object, sourceObject: object, options?: object): object;

    /** @deprecated do not use */
    export function assign(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated use joint.util.defaults */
    export function supplement(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated use joint.util.defaultsDeep */
    export function deepSupplement(destionationObject: object, ...sourceObjects: object[]): object;

    export function defaults(destinationObject: object, ...sourceObjects: object[]): object;

    export function defaultsDeep(destinationObject: object, ...sourceObjects: object[]): object;

    export function invoke(collection: Collection, methodPath: PropertyPath, args?: any[]): any[];
    export function invoke(collection: Collection, functionToInvokeForAll: IterateeFunction, args?: any[]): any[];

    export function sortedIndex(sortedArray: any[], valueToInsert: any, iteratee?: Iteratee): number;

    export function uniq(array: any[], iteratee?: Iteratee): any[];

    export function clone<T>(value: T): T;

    export function cloneDeep<T>(value: T): T;

    export function isEmpty(value: any): boolean;

    export function isEqual(value: any, otherValue: any): boolean;

    export function isFunction(value: any): boolean;

    export function isPlainObject(value: any): boolean;

    export function toArray(value: any): any[];

    export function debounce(func: Function, wait?: number, options?: object): Function;

    export function groupBy(collection: Collection, iteratee?: Iteratee): object;

    export function sortBy(collection: Collection, iterateesArray: Iteratee[]): any[];

    export function flattenDeep(array: any[]): any[];

    export function without(array: any[], ...values: any[]): any[];

    export function difference(array: any[], ...excludedValuesArrays: any[][]): any[];

    export function intersection(...arrays: any[][]): any[];

    export function union(...arrays: any[][]): any[];

    export function has(object: object, path: PropertyPath): boolean;

    export function result(object: object, propertyPath: PropertyPath, defaultValue?: any): any;

    export function omit(object: object, ...propertyPathsToOmit: PropertyPath[]): object;

    export function pick(object: object, ...propertyPathsToPick: PropertyPath[]): object;

    export function bindAll(object: object, methodNames: PropertyPath[]): object;

    export function forIn(object: object, iteratee?: Iteratee): object;

    export function camelCase(string: string): string;

    export function uniqueId(prefix?: string): string;

    // `merge` has a weird signature
    // typescript cannot express "any number of objects optionally followed by CustomizerFunction"
    export function merge(destinationObject: object, sourceObject: object, customizer?: CustomizerFunction): object;
    export function merge(destinationObject: object, sourceObject1: object, sourceObject2: object, customizer?: CustomizerFunction): object;
    export function merge(destinationObject: object, sourceObject1: object, sourceObject2: object, sourceObject3: object, customizer?: CustomizerFunction): object;
    export function merge(destinationObject: object, sourceObject1: object, sourceObject2: object, sourceObject3: object, sourceObject4: object, customizer?: CustomizerFunction): object;
    // generic but less precise signature for `merge`
    export function merge(destinationObject: object, ...sourceObjectsOptionalFinalCustomizer: SourceObjectsOptionalFinalCustomizer): object;

    // ADDITIONAL SIMPLE UTIL FUNCTIONS:

    export function isBoolean(value: any): boolean;

    export function isObject(value: any): boolean;

    export function isNumber(value: any): boolean;

    export function isString(value: any): boolean;

    export function noop(): void;
}

// env

export namespace env {

    export function addTest(name: string, fn: () => boolean): void;

    export function test(name: string): boolean;
}

// layout

export namespace layout {

    export namespace DirectedGraph {

        interface Edge {
            minLen?: number;
            weight?: number;
            labelpos?: 'l' | 'c' | 'r';
            labeloffset?: number;
            width?: number;
            height?: number;
        }

        interface Node {
            width?: number;
            height?: number;
        }

        interface LayoutOptions {
            rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
            ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
            nodeSep?: number;
            edgeSep?: number;
            rankSep?: number;
            marginX?: number;
            marginY?: number;
            resizeClusters?: boolean;
            clusterPadding?: dia.Padding;
            setPosition?: (element: dia.Element, position: dia.BBox) => void;
            setVertices?: boolean | ((link: dia.Link, vertices: dia.Point[]) => void);
            setLabels?: boolean | ((link: dia.Link, position: dia.Point, points: dia.Point[]) => void);
            debugTiming?: boolean;
            exportElement?: (element: dia.Element) => Node;
            exportLink?: (link: dia.Link) => Edge;
            // deprecated
            setLinkVertices?: boolean;
        }

        export function layout(graph: dia.Graph | dia.Cell[], opt?: LayoutOptions): g.Rect;
    }
}

// mvc

export namespace mvc {

    interface ViewOptions<T extends Backbone.Model> extends Backbone.ViewOptions<T> {
        theme?: string;
    }

    interface viewEventData {
        [key: string]: any;
    }

    class View<T extends Backbone.Model> extends Backbone.View<T> {

        constructor(opt?: ViewOptions<T>);

        theme: string;

        themeClassNamePrefix: string

        defaultTheme: string;

        requireSetThemeOverride: boolean;

        documentEvents?: Backbone.EventsHash;

        children?: dia.MarkupJSON;

        setTheme(theme: string, opt?: { override?: boolean }): this;

        getEventNamespace(): string;

        delegateDocumentEvents(events?: Backbone.EventsHash, data?: viewEventData): this;

        undelegateDocumentEvents(): this;

        eventData(evt: JQuery.Event): viewEventData;
        eventData(evt: JQuery.Event, data: viewEventData): this;

        renderChildren(children?: dia.MarkupJSON): this;

        findAttribute(attributeName: string, node: Element): string | null;

        protected init(): void;

        protected onRender(): void;

        protected onSetTheme(oldTheme: string, newTheme: string): void;

        protected onRemove(): void;
    }
}

// routers

export namespace routers {

    interface NormalRouterArguments {

    }

    interface ManhattanRouterArguments {
        step?: number;
        padding?: dia.Sides;
        maximumLoops?: number;
        maxAllowedDirectionChange?: number;
        perpendicular?: boolean;
        excludeEnds?: dia.LinkEnd[];
        excludeTypes?: string[];
        startDirections?: dia.OrthogonalDirection[];
        endDirections?: dia.OrthogonalDirection[];
    }

    interface OrthogonalRouterArguments {
        elementPadding?: number;
        padding?: dia.Sides;
    }

    interface OneSideRouterArguments {
        side?: dia.OrthogonalDirection;
        padding?: dia.Sides;
    }

    interface RouterArgumentsMap {
        'normal': NormalRouterArguments;
        'manhattan': ManhattanRouterArguments;
        'metro': ManhattanRouterArguments;
        'orthogonal': OrthogonalRouterArguments;
        'oneSide': OneSideRouterArguments;
        [key: string]: { [key: string]: any };
    }

    type RouterType = keyof RouterArgumentsMap;

    type GenericRouterArguments<K extends RouterType> = RouterArgumentsMap[K];

    interface GenericRouter<K extends RouterType> {
        (
            vertices: dia.Point[],
            args?: GenericRouterArguments<K>,
            linkView?: dia.LinkView
        ): dia.Point[];
    }

    interface GenericRouterJSON<K extends RouterType> {
        name: K;
        args?: GenericRouterArguments<K>;
    }

    type RouterArguments = GenericRouterArguments<RouterType>;

    type Router = GenericRouter<RouterType>;

    type RouterJSON = GenericRouterJSON<RouterType>;

    export var manhattan: GenericRouter<'manhattan'>;
    export var metro: GenericRouter<'metro'>;
    export var normal: GenericRouter<'normal'>;
    export var orthogonal: GenericRouter<'orthogonal'>;
    export var oneSide: GenericRouter<'oneSide'>;
}

// connectors

export namespace connectors {

    interface NormalConnectorArguments {
        raw?: boolean;
    }

    interface RoundedConnectorArguments {
        raw?: boolean;
        radius?: number;
    }

    interface SmoothConnectorArguments {
        raw?: boolean;
    }

    interface JumpOverConnectorArguments {
        raw?: boolean;
        size?: number;
        jump?: 'arc' | 'gap' | 'cubic';
    }

    interface ConnectorArgumentsMap {
        'normal': NormalConnectorArguments;
        'rounded': RoundedConnectorArguments;
        'smooth': SmoothConnectorArguments;
        'jumpover': JumpOverConnectorArguments;
        [key: string]: { [key: string]: any };
    }

    type ConnectorType = keyof ConnectorArgumentsMap;

    type GenericConnectorArguments<K extends ConnectorType> = ConnectorArgumentsMap[K];

    interface GenericConnector<K extends ConnectorType> {
        (
            sourcePoint: dia.Point,
            targetPoint: dia.Point,
            routePoints: dia.Point[],
            args?: GenericConnectorArguments<K>,
            //linkView?: dia.LinkView
        ): string | g.Path;
    }

    interface GenericConnectorJSON<K extends ConnectorType> {
        name: K;
        args?: GenericConnectorArguments<K>;
    }

    type ConnectorArguments = GenericConnectorArguments<ConnectorType>;

    type Connector = GenericConnector<ConnectorType>;

    type ConnectorJSON = GenericConnectorJSON<ConnectorType>;

    export var normal: GenericConnector<'normal'>;
    export var rounded: GenericConnector<'rounded'>;
    export var smooth: GenericConnector<'smooth'>;
    export var jumpover: GenericConnector<'jumpover'>;
}

// anchors

export namespace anchors {

    interface RotateAnchorArguments {
        rotate?: boolean;
    }

    interface BBoxAnchorArguments extends RotateAnchorArguments {
        dx?: number | string;
        dy?: number | string;
    }

    interface PaddingAnchorArguments {
        padding?: number;
    }

    interface MidSideAnchorArguments extends RotateAnchorArguments, PaddingAnchorArguments {

    }

    interface ModelCenterAnchorArguments {

    }

    interface AnchorArgumentsMap {
        'center': BBoxAnchorArguments,
        'top': BBoxAnchorArguments,
        'bottom': BBoxAnchorArguments,
        'left': BBoxAnchorArguments,
        'right': BBoxAnchorArguments,
        'topLeft': BBoxAnchorArguments,
        'topRight': BBoxAnchorArguments,
        'bottomLeft': BBoxAnchorArguments,
        'bottomRight': BBoxAnchorArguments,
        'perpendicular': PaddingAnchorArguments;
        'midSide': MidSideAnchorArguments;
        'modelCenter': ModelCenterAnchorArguments;
        [key: string]: { [key: string]: any };
    }

    type AnchorType = keyof AnchorArgumentsMap;

    type GenericAnchorArguments<K extends AnchorType> = AnchorArgumentsMap[K];

    interface GenericAnchor<K extends AnchorType> {
        (
            endView: dia.CellView,
            endMagnet: SVGElement,
            anchorReference: g.Point | SVGElement,
            opt: AnchorArgumentsMap[K],
            //endType: string,
            //linkView: dia.LinkView
        ): g.Point;
    }

    interface GenericAnchorJSON<K extends AnchorType> {
        name: K;
        args?: AnchorArgumentsMap[K];
    }

    type AnchorArguments = GenericAnchorArguments<AnchorType>;

    type Anchor = GenericAnchor<AnchorType>;

    type AnchorJSON = GenericAnchorJSON<AnchorType>;

    export var center: GenericAnchor<'center'>;
    export var top: GenericAnchor<'top'>;
    export var bottom: GenericAnchor<'bottom'>;
    export var left: GenericAnchor<'left'>;
    export var right: GenericAnchor<'right'>;
    export var topLeft: GenericAnchor<'topLeft'>;
    export var topRight: GenericAnchor<'topRight'>;
    export var bottomLeft: GenericAnchor<'bottomLeft'>;
    export var bottomRight: GenericAnchor<'bottomRight'>;
    export var perpendicular: GenericAnchor<'perpendicular'>;
    export var midSide: GenericAnchor<'midSide'>;
}

// connection points

export namespace connectionPoints {

    interface DefaultConnectionPointArguments {
        offset?: number;
    }

    interface StrokeConnectionPointArguments extends DefaultConnectionPointArguments {
        stroke?: boolean;
    }

    interface BoundaryConnectionPointArguments extends StrokeConnectionPointArguments {
        selector?: Array<string | number> | string;
        precision?: number;
        extrapolate?: boolean;
        sticky?: boolean;
        insideout?: boolean;
    }

    interface ConnectionPointArgumentsMap {
        'anchor': DefaultConnectionPointArguments,
        'bbox': StrokeConnectionPointArguments,
        'rectangle': StrokeConnectionPointArguments,
        'boundary': BoundaryConnectionPointArguments,
        [key: string]: { [key: string]: any };
    }

    type ConnectionPointType = keyof ConnectionPointArgumentsMap;

    type GenericConnectionPointArguments<K extends ConnectionPointType> = ConnectionPointArgumentsMap[K];

    interface GenericConnectionPoint<K extends ConnectionPointType> {
        (
            endPathSegmentLine: g.Line,
            endView: dia.CellView,
            endMagnet: SVGElement,
            opt: ConnectionPointArgumentsMap[K],
            //endType: string,
            //linkView: dia.LinkView
        ): g.Point;
    }

    interface GenericConnectionPointJSON<K extends ConnectionPointType> {
        name: K;
        args?: ConnectionPointArgumentsMap[K];
    }

    type ConnectionPointArguments = GenericConnectionPointArguments<ConnectionPointType>;

    type ConnectionPoint = GenericConnectionPoint<ConnectionPointType>;

    type ConnectionPointJSON = GenericConnectionPointJSON<ConnectionPointType>;

    export var anchor: GenericConnectionPoint<'anchor'>;
    export var bbox: GenericConnectionPoint<'bbox'>;
    export var rectangle: GenericConnectionPoint<'rectangle'>;
    export var boundary: GenericConnectionPoint<'boundary'>;
}

// highlighters

export namespace highlighters {

    interface AddClassHighlighterArguments {
        className?: string;
    }

    interface OpacityHighlighterArguments {

    }

    interface StrokeHighlighterArguments {
        padding?: number;
        rx?: number;
        ry?: number;
        attrs?: attributes.NativeSVGAttributes;
    }

    interface HighlighterArgumentsMap {
        'addClass': AddClassHighlighterArguments;
        'opacity': OpacityHighlighterArguments;
        'stroke': StrokeHighlighterArguments;
        [key: string]: { [key: string]: any };
    }

    type HighlighterType = keyof HighlighterArgumentsMap;

    type GenericHighlighterArguments<K extends HighlighterType> = HighlighterArgumentsMap[K];

    interface GenericHighlighter<K extends HighlighterType> {
        highlight(cellView: dia.CellView, magnetEl: SVGElement, opt?: GenericHighlighterArguments<K>): void;

        unhighlight(cellView: dia.CellView, magnetEl: SVGElement, opt?: GenericHighlighterArguments<K>): void;
    }

    interface GenericHighlighterJSON<K extends HighlighterType> {
        name: K;
        options?: GenericHighlighterArguments<K>;
    }

    type HighlighterArguments = GenericHighlighterArguments<HighlighterType>;

    type Highlighter = GenericHighlighter<HighlighterType>;

    type HighlighterJSON = GenericHighlighterJSON<HighlighterType>;

    export var addClass: GenericHighlighter<'addClass'>;
    export var opacity: GenericHighlighter<'opacity'>;
    export var stroke: GenericHighlighter<'stroke'>;
}

export namespace connectionStrategies {

    interface ConnectionStrategy {
        (
            endDefinition: dia.Cell,
            endView: dia.CellView,
            endMagnet: SVGElement,
            coords: dia.Point,
            //link: dia.Link,
            //endType: string
        ): dia.Element;
    }

    export var useDefaults: ConnectionStrategy;
    export var pinAbsolute: ConnectionStrategy;
    export var pinRelative: ConnectionStrategy;
}

export namespace attributes {

    interface SVGCoreAttributes {
        'id'?: string;
        'xml:base'?: string;
        'xml:lang'?: string;
        'xml:space'?: string;
        'tabindex'?: number;
    }

    interface SVGConditionalProcessingAttributes {
        'requiredExtensions'?: boolean;
        'requiredFeatures'?: string;
        'systemLanguage'?: string;
    }

    interface SVGXLinkAttributes {
        'xlink:href'?: string;
        'xlink:type'?: string;
        'xlink:role'?: string;
        'xlink:arcrole'?: string;
        'xlink:title'?: string;
        'xlink:show'?: string;
        'xlink:actuate'?: string;
    }

    interface SVGPresentationAttributes {
        'alignment-baseline'?: any;
        'baseline-shift'?: any;
        'clip'?: any;
        'clip-path'?: any;
        'clip-rule'?: any;
        'color'?: any;
        'color-interpolation'?: any;
        'color-interpolation-filters'?: any;
        'color-profile'?: any;
        'color-rendering'?: any;
        'cursor'?: any;
        'direction'?: any;
        'display'?: any;
        'dominant-baseline'?: any;
        'enable-background'?: any;
        'fill'?: any;
        'fill-opacity'?: any;
        'fill-rule'?: any;
        'filter'?: any;
        'flood-color'?: any;
        'flood-opacity'?: any;
        'font-family'?: any;
        'font-size'?: any;
        'font-size-adjust'?: any;
        'font-stretch'?: any;
        'font-style'?: any;
        'font-variant'?: any;
        'font-weight'?: any;
        'glyph-orientation-horizontal'?: any;
        'glyph-orientation-vertical'?: any;
        'image-rendering'?: any;
        'kerning'?: any;
        'letter-spacing'?: any;
        'lighting-color'?: any;
        'marker-end'?: any;
        'marker-mid'?: any;
        'marker-start'?: any;
        'mask'?: any;
        'opacity'?: any;
        'overflow'?: any;
        'pointer-events'?: any;
        'shape-rendering'?: any;
        'stop-color'?: any;
        'stop-opacity'?: any;
        'stroke'?: any;
        'stroke-dasharray'?: any;
        'stroke-dashoffset'?: any;
        'stroke-linecap'?: any;
        'stroke-linejoin'?: any;
        'stroke-miterlimit'?: any;
        'stroke-opacity'?: any;
        'stroke-width'?: any;
        'text-anchor'?: any;
        'text-decoration'?: any;
        'text-rendering'?: any;
        'unicode-bidi'?: any;
        'visibility'?: any;
        'word-spacing'?: any;
        'writing-mode'?: any;
    }

    interface NativeSVGAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGXLinkAttributes {
        'class'?: string;
        'style'?: any;
        'transform'?: string;
        'externalResourcesRequired'?: boolean;

        [key: string]: any;
    }

    interface SVGAttributeTextWrap {
        text?: string;
        width?: string | number;
        height?: string | number;
        ellipsis?: boolean | string;
        [key: string]: any
    }

    interface SVGAttributes extends NativeSVGAttributes {
        // Special attributes
        filter?: string | { [key: string]: any };
        fill?: string | { [key: string]: any };
        stroke?: string | { [key: string]: any };
        sourceMarker?: { [key: string]: any };
        targetMarker?: { [key: string]: any };
        vertexMarker?: { [key: string]: any };
        text?: string;
        textWrap?: SVGAttributeTextWrap;
        lineHeight?: number | string;
        textPath?: any;
        annotations?: any;
        port?: string | { [key: string]: any };
        style?: { [key: string]: any };
        html?: string;
        ref?: string;
        refX?: string | number;
        refY?: string | number;
        refX2?: string | number;
        refY2?: string | number;
        refDx?: string | number;
        refDy?: string | number;
        refWidth?: string | number;
        refHeight?: string | number;
        refRx?: string | number;
        refRy?: string | number;
        refR?: string | number;
        refRInscribed?: string | number; // alias for refR
        refRCircumscribed?: string | number;
        refCx?: string | number;
        refCy?: string | number;
        refD?: string;
        refDResetOffset?: string; // alias for refD
        refDKeepOffset?: string;
        refPoints?: string;
        refPointsResetOffset?: string; // alias for refPoints
        refPointsKeepOffset?: string;
        resetOffset?: boolean;
        xAlignment?: 'middle' | 'right' | number | string;
        yAlignment?: 'middle' | 'bottom' | number | string;
        event?: string;
        magnet?: boolean | string;
        title?: string;
        textVerticalAnchor?: 'bottom' | 'top' | 'middle' | number | string;
        connection?: boolean;
        atConnectionLength?: number;
        atConnectionLengthKeepGradient?: number; // alias for atConnectionLength
        atConnectionLengthIgnoreGradient?: number;
        atConnectionRatio?: number;
        atConnectionRatioKeepGradient?: number; // alias for atConnectionRatio
        atConnectionRatioIgnoreGradient?: number;
        // CamelCase variants of native attributes
        alignmentBaseline?: any;
        baselineShift?: any;
        clipPath?: any;
        clipRule?: any;
        colorInterpolation?: any;
        colorInterpolationFilters?: any;
        colorProfile?: any;
        colorRendering?: any;
        dominantBaseline?: any;
        enableBackground?: any;
        fillOpacity?: any;
        fillRule?: any;
        floodColor?: any;
        floodOpacity?: any;
        fontFamily?: any;
        fontSize?: any;
        fontSizeAdjust?: any;
        fontStretch?: any;
        fontStyle?: any;
        fontVariant?: any;
        fontWeight?: any;
        glyphOrientationHorizontal?: any;
        glyphOrientationVertical?: any;
        imageRendering?: any;
        letterSpacing?: any;
        lightingColor?: any;
        markerEnd?: any;
        markerMid?: any;
        markerStart?: any;
        pointerEvents?: any;
        shapeRendering?: any;
        stopColor?: any;
        stopOpacity?: any;
        strokeDasharray?: any;
        strokeDashoffset?: any;
        strokeLinecap?: any;
        strokeLinejoin?: any;
        strokeMiterlimit?: any;
        strokeOpacity?: any;
        strokeWidth?: any;
        textAnchor?: any;
        textDecoration?: any;
        textRendering?: any;
        unicodeBidi?: any;
        wordSpacing?: any;
        writingMode?: any;
        xlinkHref?: string;
        xlinkShow?: string;
        xlinkType?: string;
        xlinkRole?: string;
        xlinkArcrole?: string;
        xlinkTitle?: string;
        xlinkActuate?: string;
        xmlSpace?: string;
        xmlBase?: string;
        xmlLang?: string;
        // Backwards compatibility
        'ref-x'?: string | number;
        'ref-y'?: string | number;
        'ref-dx'?: string | number;
        'ref-dy'?: string | number;
        'ref-width'?: string | number;
        'ref-height'?: string | number;
        'x-alignment'?: 'middle' | 'right' | number | string;
        'y-alignment'?: 'middle' | 'bottom' | number | string;
    }

    interface SVGTextAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        dx?: string | number;
        dy?: string | number;
        rotate?: string;
        textAnchor?: string;
        textLength?: number;
        lengthAdjust?: string;
        'text-anchor'?: string;
        'text-lenght'?: number;
        'length-adjust'?: string;
    }

    interface SVGRectAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        width?: string | number;
        height?: string | number;
        ry?: string | number;
        rx?: string | number;
    }

    interface SVGCircleAttributes extends SVGAttributes {
        cx?: string | number;
        cy?: string | number;
        r?: string | number;
    }

    interface SVGEllipseAttributes extends SVGAttributes {
        cx?: string | number;
        cy?: string | number;
        rx?: string | number;
        ry?: string | number;
    }

    interface SVGPolygonAttributes extends SVGAttributes {
        points?: string;
    }

    interface SVGPolylineAttributes extends SVGAttributes {
        points?: string;
    }

    interface SVGImageAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        width?: string | number;
        height?: string | number;
        preserveAspectRatio?: string;
    }

    interface SVGPathAttributes extends SVGAttributes {
        d?: string;
        pathLength?: number;
        'path-length'?: number;
    }

}

export function setTheme(theme: string): void;


export namespace linkTools {

    type AnchorCallback<T> = (
        coords: g.Point,
        view: dia.CellView,
        magnet: SVGElement,
        type: string,
        linkView: dia.LinkView,
        toolView: dia.ToolView
    ) => T;

    namespace Vertices {
        interface Options extends dia.ToolView.Options {
            snapRadius?: number;
            redundancyRemoval?: boolean;
            vertexAdding?: boolean;
        }
    }

    class Vertices extends dia.ToolView {

        constructor(opt?: Vertices.Options);
    }

    namespace Segments {
        interface Options extends dia.ToolView.Options {
            snapRadius?: number;
            snapHandle?: boolean;
            redundancyRemoval?: boolean;
            segmentLengthThreshold?: number;
            anchor?: AnchorCallback<anchors.AnchorJSON>;
        }
    }

    class Segments extends dia.ToolView {

        constructor(opt?: Segments.Options);
    }

    abstract class Arrowhead extends dia.ToolView {

        ratio: number;
        arrowheadType: string;

        protected onPointerDown(evt: JQuery.Event): void;

        protected onPointerMove(evt: JQuery.Event): void;

        protected onPointerUp(evt: JQuery.Event): void;
    }

    class SourceArrowhead extends Arrowhead {


    }

    class TargetArrowhead extends Arrowhead {


    }

    namespace Anchor {
        interface Options extends dia.ToolView.Options {
            snap?: AnchorCallback<dia.Point>,
            anchor?: AnchorCallback<anchors.AnchorJSON>,
            customAnchorAttributes?: attributes.NativeSVGAttributes;
            defaultAnchorAttributes?: attributes.NativeSVGAttributes;
            areaPadding?: number;
            snapRadius?: number;
            restrictArea?: boolean;
            redundancyRemoval?: boolean;
        }
    }

    abstract class Anchor extends dia.ToolView {

        type: string;

        constructor(opt?: Anchor.Options);
    }

    class SourceAnchor extends Anchor {


    }

    class TargetAnchor extends Anchor {


    }

    namespace Button {

        type ActionCallback = (evt: JQuery.Event, view: dia.LinkView) => void;

        interface Options extends dia.ToolView.Options {
            distance?: number | string;
            offset?: number;
            rotate?: boolean;
            action?: ActionCallback;
            markup?: dia.MarkupJSON;
        }
    }

    class Button extends dia.ToolView {

        constructor(opt?: Button.Options);

        protected onPointerDown(evt: JQuery.Event): void;
    }

    class Remove extends dia.ToolView {

    }

    namespace Boundary {
        interface Options extends dia.ToolView.Options {
            padding?: number;
        }
    }

    class Boundary extends dia.ToolView {

        constructor(opt?: Boundary.Options);
    }
}

export namespace ui {

    class Clipboard extends Backbone.Collection<Backbone.Model> {

        constructor(opt?: { useLocalStorage?: boolean });

        /**
         * This function returns the elements and links from the original graph that were copied. This is useful for implements
         * the Cut operation where the original cells should be removed from the graph. `selection` contains
         * elements that should be copied to the clipboard. Note that with these elements, also all the associated
         * links are copied. That's why we also need the `graph` parameter, to find these links.
         */
        copyElements(selection: Backbone.Collection<dia.Cell>, graph: dia.Graph, opt?: { [key: string]: any }): Array<dia.Cell>;

        /**
         * Same logic as per `copyElements`, but elements are removed from the graph
         */
        cutElements(selection: Backbone.Collection<dia.Cell>, graph: dia.Graph, opt?: { [key: string]: any }): Array<dia.Cell>;

        /**
         * If `translate` object with `dx` and `dy` properties is passed, the copied elements will be
         * translated by the specified amount. This is useful for e.g. the 'cut' operation where we'd like to have
         * the pasted elements moved by an offset to see they were pasted to the paper.
         *
         * If `useLocalStorage` is `true`, the copied elements will be saved to the localStorage (if present)
         * making it possible to copy-paste elements between browser tabs or sessions.
         *
         * `link` is attributes that will be set all links before they are added to the `graph`.
         * This is useful for e.g. setting `z: -1` for links in order to always put them to the bottom of the paper.
         */
        pasteCells(graph: dia.Graph, opt?: { [key: string]: any }): Array<dia.Cell>;

        clear(): void;
    }

    class SelectBox extends mvc.View<undefined> {

        constructor(opt?: SelectBox.Option);

        getSelection(): { [key: string]: any };

        getSelectionValue(selection?: SelectBox.Selection): SelectBox.Selection

        getSelectionIndex(): number;

        select(idx: string, opt?: { [key: string]: any }): void;

        selectByValue(value: any, opt?: { [key: string]: any }): void;

        isOpen(): boolean;

        toggle(): void;

        open(): void;

        close(): void;

        isDisabled(): boolean;

        enable(): void;

        disable(): void;

        render(): this;

        static OptionsView: any;

        protected onToggle(evt: JQuery.Event): void;

        protected onOutsideClick(evt: JQuery.Event): void;

        protected onOptionsMouseOut(evt: JQuery.Event): void;

        protected onOptionSelect(idx: string, opt?: { [key: string]: any }): void;

        protected onOptionHover(option?: { [key: string]: any }, idx?: string): void;

        protected position(): void;

        protected calculateElOverflow(el: HTMLElement, target: any): number;
    }

    namespace SelectBox {

        export interface Selection {
            [key: string]: any;
        }

        export interface Option extends mvc.ViewOptions<undefined> {
            icon?: string;
            content?: JQuery | string | HTMLElement;
            options?: Array<{ [key: string]: any }>;
            target?: JQuery | string | HTMLElement;
            width?: number;
            openPolicy?: 'selected' | 'auto' | 'above' | 'coverAbove' | 'below' | 'coverBelow';
            selectBoxOptionsClass?: string | (() => string);
            placeholder?: string;
            disabled?: boolean;
            keyboardNavigation?: boolean
        }
    }

    class ColorPalette extends ui.SelectBox {

        protected position(): void;

        static OptionsView: any;
    }

    namespace ContextToolbar {

        export interface Options extends mvc.ViewOptions<undefined> {
            padding?: number;
            autoClose?: boolean;
            vertical?: boolean;
            type?: string;
            tools?: { [key: string]: any };
            root?: HTMLElement;
            target?: string | JQuery | HTMLElement;
        }
    }

    class ContextToolbar extends mvc.View<undefined> {

        constructor(opt?: ContextToolbar.Options)

        render(): this;

        static opened: ContextToolbar | undefined;

        static close(): void;

        // Call whenever the `options.target` changes its position.
        static update(): void;

        protected getRoot(): JQuery;

        protected position(): void;

        protected onToolPointerdown(evt: JQuery.Event): void ;

        protected onDocumentPointerdown(evt: JQuery.Event): void;

        protected renderContent(): void;

        protected delegateAutoCloseEvents(): void;

        protected undelegateAutoCloseEvents(): void;
    }

    namespace Dialog {

        export interface Options extends mvc.ViewOptions<undefined> {
            draggable?: boolean;
            closeButtonContent?: string | HTMLElement | JQuery;
            closeButton?: boolean;
            inlined?: boolean;
            modal?: boolean;
            width?: number;
            title?: string;
            buttons?: Array<{
                content?:  string | HTMLElement | JQuery;
                position?: string;
                action?: string;
            }>;
            type?: string;
            content?: string | HTMLElement | JQuery;
        }
    }

    class Dialog extends mvc.View<undefined> {

        constructor(options: Dialog.Options);

        close(): this;

        open(el?: JQuery | HTMLElement): this;

        render(): this;

        protected action(evt: JQuery.Event): void;

        protected onDragStart(evt: JQuery.Event): void;

        protected onDrag(evt: JQuery.Event): void;

        protected onDragEnd(): void;
    }

    namespace FlashMessage {

        export interface Options extends Dialog.Options {
            cascade?: boolean,
            closeAnimation?: {
                delay?: number,
                duration?: number,
                easing?: string,
                properties?: {
                    opacity?: number
                }
            },
            openAnimation?: {
                duration?: number,
                easing?: string,
                properties?: {
                    opacity?: number
                }
            }
        }
    }

    class FlashMessage extends ui.Dialog {

        constructor(options?: FlashMessage.Options)

        protected addToCascade(): void;

        protected removeFromCascade(): void;

        protected startCloseAnimation(): void;

        protected startOpenAnimationk(): void;

        static padding: 15;

        static open(content: any, title: any, opt?: { [key: string]: any }): void;

        static close(): void;

        open(): this;

        close(): this;
    }

    namespace FreeTransform {

        export interface Options extends mvc.ViewOptions<undefined> {
            cellView?: dia.CellView;
            rotateAngleGrid?: number;
            preserveAspectRatio?: boolean;
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
            allowOrthogonalResize?: boolean;
            allowRotation?: boolean;
            clearAll?: boolean;
            clearOnBlankPointerdown?: boolean;
        }
    }

    class FreeTransform extends mvc.View<undefined> {

        constructor(options?: FreeTransform.Options);

        update(): void;

        render(): this;

        static clear(paper: dia.Paper): void;

        protected startResizing(evt: JQuery.Event): void;

        protected toValidResizeDirection(direction: string): any

        protected startRotating(evt: JQuery.Event): void;

        protected pointermove(evt: JQuery.Event): void;

        protected pointerup(evt: JQuery.Event): void;

        protected startOp(el: string | JQuery | HTMLElement): void;

        protected stopOp(): void;

        protected renderHandles(): void;
    }

    namespace Inspector {

        interface Options extends mvc.ViewOptions<undefined> {
            cellView?: dia.CellView;
            cell?: dia.Cell;
            live?: boolean;
            validateInput?: (input: any, path: string, type: string) => boolean;
            groups?: any;
            inputs?: any;
            storeGroupsState?: boolean;
            restoreGroupsState?: boolean;
            renderFieldContent?: (opt: { [key: string]: any }, path: string, value: any) => string | JQuery | HTMLElement;
            getFieldValue?: (attribute: HTMLElement, type: string) => any;
            multiOpenGroups?: boolean;
            stateKey?: (model: dia.Cell) => string;
            operators?: { [key: string]: (cell: dia.Cell, value: any, prop: any) => boolean };
        }
    }

    class Inspector extends mvc.View<undefined> {

        constructor(options: Inspector.Options);

        render(): this;

        updateCell($attr?: JQuery, attrPath?: string, opt?: { [key: string]: any }): void;

        toggleGroup(name: string): void;

        closeGroup(name: string, opt?: { [key: string]: any }): void;

        openGroup(name: string, opt?: { [key: string]: any }): void;

        closeGroups(): void;

        openGroups(): void;

        storeGroupsState(): void;

        restoreGroupsState(): void;

        static create(container: HTMLElement | string | JQuery, opt?: Inspector.Options): ui.Inspector;

        static close(): void;

        protected renderGroup(opt?: { [key: string]: any }): JQuery;

        protected renderOwnFieldContent(opt?: { [key: string]: any }): JQuery;

        protected replaceHTMLEntity(entity: any, code: any): void;

        protected renderObjectProperty(opt?: { [key: string]: any }): JQuery;

        protected renderListItem(opt?: { [key: string]: any }): JQuery;

        protected renderFieldContainer(opt?: { [key: string]: any }): JQuery;

        protected renderTemplate($el: JQuery, options: { [key: string]: any }, path: string, opt?: { [key: string]: any }): void;

        protected addListItem(evt: JQuery.Event): void;

        protected deleteListItem(evt: JQuery.Event): void;

        protected onChangeInput(evt: JQuery.Event): void;

        protected processInput($input: JQuery, opt: { [key: string]: any }): void;

        protected onCellChange(eventName: string, cell: dia.Cell, change: any, opt: { [key: string]: any }): void;

        protected pointerdown(evt: JQuery.Event): void;

        protected pointerup(): void;

        protected pointerfocusin(evt: JQuery.Event): void;

        protected pointerfocusout(evt: JQuery.Event): void;

        protected onGroupLabelClick(evt: JQuery.Event): void;

        protected renderFieldContent(options: { [key: string]: any }, path: string, value: any): HTMLElement;

        protected onContentEditableBlur(evt: JQuery.Event): void;
    }

    namespace PaperScroller {

        export interface Options {
            paper: dia.Paper;
            padding?: dia.Padding | (() => dia.Padding);
            minVisiblePaperSize?: number;
            autoResizePaper?: boolean;
            baseWidth?: number;
            baseHeight?: number;
            contentOptions?: {
                padding?: dia.Padding | (() => dia.Padding),
                gridWidth?: number,
                gridHeight?: number,
                minHeight?: number,
                minWidth?: number,
                allowNewOrigin?: string
            },
            cursor?: string;
        }
    }

    class PaperScroller extends mvc.View<undefined> {

        transitionClassName: string;

        transitionEventName: string;

        constructor(opt?: PaperScroller.Options);

        lock(): this;

        unlock(): this;

        render(): this;

        setCursor(cursor: string): this;

        clientToLocalPoint(x: number, y: number): g.Point;

        localToBackgroundPoint(x: number, y: number): g.Point;

        center(opt?: { [key: string]: any }): this;
        center(x: number, y?: number, opt?: { [key: string]: any }): this;

        centerContent(opt?: { [key: string]: any }): this;

        centerElement(element: dia.Element, opt?: { [key: string]: any }): this;

        positionContent(positionName: string, opt?: { [key: string]: any }): this;

        positionElement(element: dia.Element, positionName: string, opt?: { [key: string]: any }): this;

        positionRect(rect: g.Rect, positionName: string, opt?: { [key: string]: any }): this;

        positionPoint(point: g.Point, x: number, y: number, opt?: { [key: string]: any }): this;

        scroll(x: number, y?: number, opt?: { [key: string]: any }): void;

        scrollToContent(opt?: { [key: string]: any }): void;

        scrollToElement(element: dia.Element, opt?: { [key: string]: any }): void;

        addPadding(left: number, right: number, top: number, bottom: number): this;

        zoom(): number;
        zoom(value: number, opt?: { [key: string]: any }): this;

        zoomToFit(opt?: dia.Paper.ScaleContentOptions): this;

        transitionToPoint(x: number, y: number, opt?: { [key: string]: any }): this;

        removeTransition(): this;

        transitionToRect(rect: g.Rect, opt?: { [key: string]: any }): g.Point;

        startPanning(evt: JQuery.Event): void;

        stopPanning(evt: JQuery.Event): void;

        getClientSize(): dia.Size;

        getVisibleArea(): g.Rect;

        isElementVisible(element: dia.Element, opt?: { [key: string]: any }): boolean;

        isPointVisible(point: dia.Point): boolean;

        protected onBackgroundEvent(evt: JQuery.Event): void;

        protected onResize(): void;

        protected onScale(sx: number, sy: number, ox: number, oy: number): void;

        protected beforePaperManipulation(): void;

        protected afterPaperManipulation(): void;
    }

    namespace Lightbox {

        export type Easing = string;

        export interface Options extends Dialog.Options {
            image: string;
            downloadable?: boolean;
            fileName?: string;
            closeAnimation?: {
                delay?: number;
                duration?: number;
                easing?: Easing;
                properties?: {
                    opacity?: number
                }
            };
            top?: number;
            windowArea?: number;
            openAnimation?: boolean
        }
    }

    class Lightbox extends ui.Dialog {

        constructor(options?: Lightbox.Options)

        open(): this;

        positionAndScale(): void;

        close(): this;

        startCloseAnimation(): void;

        startOpenAnimation(): void;
    }

    class Popup extends ContextToolbar {

        renderContent(): void;
    }

    namespace PathDrawer {

        export interface Options extends mvc.ViewOptions<undefined> {
            target: SVGSVGElement,
            pathAttributes?: attributes.NativeSVGAttributes,
            startPointMarkup?: string,
            snapRadius?: number
        }
    }

    class PathDrawer extends mvc.View<undefined> {

        constructor(options?: PathDrawer.Options);

        render(): this;

        remove(): this;

        onStartPointPointerDown(evt: JQuery.Event): void;

        onPointerDown(evt: JQuery.Event): void;

        onDoubleClick(evt: JQuery.Event): void;

        onContextMenu(evt: JQuery.Event): void;
    }

    namespace PathEditor {

        export interface Options extends mvc.ViewOptions<undefined> {
            pathElement: SVGPathElement,
            anchorPointMarkup?: string,
            controlPointMarkup?: string
        }
    }

    class PathEditor extends mvc.View<undefined> {

        constructor(options?: PathEditor.Options);

        render(): this;

        remove(): this;

        adjustAnchorPoint(index: number, dx: number, dy: number): void;

        adjustControlPoint(index: number, controlPointIndex: number, dx: number, dy: number): void;

        getControlPointLockedStates(): boolean[][];

        setControlPointLockedStates(lockedStates: boolean[][]): void;

        onAnchorPointPointerDown(evt: JQuery.Event): void;

        onControlPointPointerDown(evt: JQuery.Event): void;

        onSegmentPathPointerDown(evt: JQuery.Event): void;

        onAnchorPointDoubleClick(evt: JQuery.Event): void;

        onControlPointDoubleClick(evt: JQuery.Event): void;

        onSegmentPathDoubleClick(evt: JQuery.Event): void;

        addClosePathSegment(evt: JQuery.Event): void;

        removeClosePathSegment(evt: JQuery.Event): void;

        convertSegmentPath(evt: JQuery.Event): void;
    }

    namespace Navigator {

        export interface Options extends mvc.ViewOptions<undefined> {
            paperConstructor?: dia.Paper;
            paperOptions?: dia.Paper.Options;
            paperScroller?: PaperScroller;
            zoomOptions?: { min?: number, max?: number };
            zoom?: { min?: number, max?: number } | boolean;
            width?: number;
            height?: number;
            padding?: number;
        }
    }

    class Navigator extends mvc.View<undefined> {

        constructor(options?: Navigator.Options);

        render(): this;

        updateCurrentView(): void;
    }

    namespace SelectButtonGroup {

        export interface Options extends mvc.ViewOptions<undefined> {
            buttonWidth?: number;
            buttonHeight?: number;
            iconWidth?: number;
            iconHeight?: number;
            options?: Array<{
                value?: any,
                content?: string | HTMLElement | JQuery,
                icon?: string,
                iconSelected?: string,
                selected?: boolean,
                buttonWidth?: number,
                buttonHeight?: number,
                iconWidth?: number,
                iconHeight?: number,
            }>;
            disabled?: boolean;
            multi?: boolean;
            selected?: any;
        }
    }

    class SelectButtonGroup extends mvc.View<undefined> {

        constructor(options?: SelectButtonGroup.Options);

        getSelection(): any;

        getSelectionValue(selection: any): any;

        select(index: number, opt?: { [key: string]: any }): void;

        selectByValue(value: any, opt?: { [key: string]: any }): void;

        deselect(): void;

        isDisabled(): boolean;

        enable(): void;

        disable(): void;

        render(): this;

        protected onSelect(evt: JQuery.Event): void;

        protected onOptionHover(evt: JQuery.Event): void;

        protected onMouseOut(evt: JQuery.Event): void;

        protected pointerdown(evt: JQuery.Event): void;

        protected pointerup(): void;
    }

    class Widget extends mvc.View<undefined> {

        constructor(opt: mvc.ViewOptions<undefined>, refs?: Array<any>);

        protected getReferences(): Array<any>;

        protected getReference(name: string): any;

        static create<T extends Widget>(opt: { [key: string]: any } | string, refs?: Array<any>): T;
    }

    namespace Toolbar {

        export interface Options extends mvc.ViewOptions<undefined> {
            tools?: Array<{ [key: string]: any }>,
            groups?: {
                [key: string]: {
                    index?: number,
                    align?: Align
                }
            }
            references?: any
        }

        const enum Align {
            Left = 'left',
            Right = 'right'
        }
    }

    class Toolbar extends mvc.View<undefined> {

        constructor(options?: Toolbar.Options);

        on(evt: string | object, callback?: (evt: JQuery.Event) => void, context?: any): this;

        getWidgetByName<T extends Widget>(name: string): T;

        getWidgets(): Array<Widget>;

        render(): this;
    }

    class Tooltip extends mvc.View<undefined> {

        constructor(options?: Tooltip.Options);

        hide(): void;

        show(evt?: JQuery.Event): void;

        toggle(evt?: JQuery.Event): void;

        isVisible(): boolean;

        render(): this;

        protected getTooltipSettings(el: HTMLElement): { [key: string]: any };
    }

    namespace Tooltip {

        export enum TooltipPosition {
            Left = 'left',
            Top = 'top',
            Bottom = 'bottom',
            Right = 'right'
        }

        const enum TooltipArrowPosition {
            Left = 'left',
            Top = 'top',
            Bottom = 'bottom',
            Right = 'right',
            Auto = 'auto',
            Off = 'off'
        }

        export interface Options extends mvc.ViewOptions<undefined> {

            position?: TooltipPosition | ((element: Element) => TooltipPosition);
            positionSelector?: string | ((element: Element) => Element);
            direction?: TooltipArrowPosition;
            minResizedWidth?: number;
            padding?: number;
            rootTarget?: any;
            target?: any;
            trigger?: string;
            viewport?: {
                selector?: null
                padding?: number
            };
            dataAttributePrefix?: string;
            template?: string;
        }
    }

    class Keyboard {

        constructor();

        on(evt: string | object, callback?: ((evt: JQuery.Event) => void) | any, context?: any): this;

        off(evt: string | object, callback?: ((evt: JQuery.Event) => void) | any, context?: any): this;

        enable(): void;

        disable(): void;

        isActive(name: string, evt: JQuery.Event): boolean;
    }

    class Selection extends mvc.View<dia.Cell> {

        constructor(options?: Selection.Options);

        cancelSelection(): void;

        addHandle(opt?: Selection.Handle): this;

        stopSelecting(evt: JQuery.Event): void;

        removeHandle(name: string): this;

        startSelecting(evt: JQuery.Event): void;

        changeHandle(name: string, opt?: Selection.Handle): this;

        translateSelectedElements(dx: number, dy: number): void;

        hide(): void;

        render(): this;

        protected onSelectionBoxPointerDown(evt: JQuery.Event): void;

        protected startTranslatingSelection(evt: JQuery.Event): void;

        protected pointerup(evt: JQuery.Event): void;

        protected destroySelectioaBox(elememet: dia.Element): void;

        protected showSelected(): void;

        protected destroyAllSelectionBoxes(): void;

        protected createSelectionBox(element: Element): void;

        protected onHandlePointerDown(evt: JQuery.Event): void;

        protected pointermove(evt: JQuery.Event): void;

        protected onRemoveElement(element: dia.Element): void;

        protected onResetElements(elements: dia.Element): void;

        protected onAddElement(element: dia.Element): void;
    }

    namespace Selection {

        export interface Options extends mvc.ViewOptions<undefined> {
            paper: dia.Paper;
            graph?: dia.Graph;
            boxContent?: string | HTMLElement | JQuery | ((boxElement: JQuery) => string | HTMLElement | JQuery);
            handles?: Array<Handle>;
            useModelGeometry?: boolean;
            strictSelection?: boolean;
            rotateAngleGrid?: number;
            allowTranslate?: boolean;
            collection?: any;
        }

        export interface Handle {
            name: string;
            position?: HandlePosition;
            events?: HandleEvents;
            attrs?: any;
            icon?: string;
            content?: string | HTMLElement | JQuery
        }

        const enum HandlePosition {
            N = 'n', NW = 'nw',
            W = 'w', SW = 'sw',
            S = 's', SE = 'se',
            E = 'e', NE = 'ne'
        }

        export interface HandleEvents {
            pointerdown?: string | ((evt: JQuery.Event) => void);
            pointermove?: string | ((evt: JQuery.Event) => void);
            pointerup?: string | ((evt: JQuery.Event) => void);
        }
    }

    namespace Snaplines {

        export interface Options extends mvc.ViewOptions<undefined> {
            paper: dia.Paper;
            distance?: number;
            filter?: string[] | dia.Cell[] | (() => string[] | dia.Cell[]);
        }
    }

    class Snaplines extends mvc.View<undefined> {

        constructor(opt?: Snaplines.Options);

        startListening(): void;

        hide(): void;

        render(): this;

        protected show(opt?: {
            vertical?: number,
            horizontal?: number
        }): void;

        protected captureCursorOffset(cellView: dia.CellView, evt: JQuery.Event, x: number, y: number): void;

        protected snapWhileResizing(cell: dia.Cell, opt?: { [key: string]: any }): void;

        protected canElementMove(cellView: dia.CellView): boolean;

        protected snapWhileMoving(cellView: dia.CellView, evt: JQuery.Event, x: number, y: number): void;

        protected onBatchStop(data: { [key: string]: any }): void;
    }

    namespace Stencil {

        export interface Options extends mvc.ViewOptions<undefined> {
            paper: dia.Paper | ui.PaperScroller,
            width?: number;
            height?: number;
            label?: string;
            groups?: { [key: string]: Stencil.Group };
            groupsToggleButtons?: boolean;
            dropAnimation?: boolean;
            search?: { [key: string]: any };
            layout?: boolean | layout.GridLayout.Options | { [key: string]: any };
            snaplines?: ui.Snaplines;
            scaleClones?: boolean;
            dragStartClone?: (cell: dia.Cell) => dia.Cell;
            dragEndClone?: (cell: dia.Cell) => dia.Cell;
            layoutGroup?: (graph: dia.Graph, group: Group) => void;
            paperOptions?: () => dia.Paper.Options | dia.Paper.Options;
            paperDragOptions?: () => dia.Paper.Options | dia.Paper.Options;
        }

        export interface Group {
            label: string;
            index: number;
            closed?: boolean;
            height?: number;
            layout?: boolean | layout.GridLayout.Options | { [key: string]: any };
        }
    }

    class Stencil extends mvc.View<undefined> {

        constructor(opt?: Stencil.Options);

        options: Stencil.Options;

        setPaper(paper: dia.Paper): void;

        startListening(): void;

        load(cells: dia.Element[] | { [key: string]: any }, group?: Stencil.Group): void;

        loadGroup(cells: dia.Element[], group: Stencil.Group): void;

        getGraph(group: string): dia.Graph;

        getPaper(group: string): dia.Paper;

        render(): this;

        toggleGroup(name: string): void;

        closeGroup(name: string): void;

        openGroup(name: string): void;

        isGroupOpen(name: string): boolean;

        closeGroups(): void;

        openGroups(): void;

        protected preparePaperForDragging(cellView: dia.CellView, clientX: number, clientY: number): void;

        protected onCloneSnapped(clone: dia.Cell, position: any, opt?: { [key: string]: any }): void;

        protected onDrag(evt: JQuery.Event): void;

        protected onDragEnd(evt: JQuery.Event): void;

        protected onDropEnd(cellClone: dia.Cell): void;

        protected onDropInvalid(evt: JQuery.Event, cellClone: dia.Cell): void;

        protected onSearch(evt: JQuery.Event): void;

        protected pointerFocusIn(): void;

        protected pointerFocusOut(): void;

        protected onGroupLabelClick(evt: JQuery.Event): void;
    }

    class TreeLayoutView extends mvc.View<undefined> {

        constructor(options?: { [key: string]: any });

        startListening(): void;

        toggleDefaultInteraction(interactive: boolean): void;

        toggleDropping(state: boolean): void;

        canDrop(): boolean;

        isActive(): boolean;

        // Interaction
        canInteract(handler: any): boolean;

        startDragging(elements: Array<dia.Element>): void;

        render(): this;

        protected onPointerdown(elementView: dia.ElementView): void;

        protected onPointermove(evt: JQuery.Event): void;

        protected onPointerup(evt: JQuery.Event): void;
    }

    namespace Halo {

        export interface Options extends mvc.ViewOptions<undefined> {
            cellView: dia.CellView;
            loopLinkPreferredSide?: 'top' | 'bottom' | 'left' | 'right';
            loopLinkWidth?: number;
            rotateAngleGrid?: number;
            boxContent?: string | HTMLElement | JQuery | ((boxElement: JQuery) => string | HTMLElement | JQuery);
            handles?: Array<Handle>;
            clearAll?: boolean;
            clearOnBlankPointerdown?: boolean;
            useModelGeometry?: boolean;
            clone?: (cell: dia.Cell, opt: { [key: string]: any }) => dia.Cell;
            type?: string;
            pieSliceAngle?: number;
            pieStartAngleOffset?: number;
            pieIconSize?: number;
            pieToggles?: Array<{ name: string, position: HandlePosition }>;
            bbox?: dia.Point | dia.BBox | ((cellView: dia.CellView) => dia.Point | dia.BBox);
            magnet?: (elementView: dia.ElementView, end: 'source' | 'target') => SVGElement;
        }

        const enum HandlePosition {
            N = 'n', NW = 'nw',
            W = 'w', SW = 'sw',
            S = 's', SE = 'se',
            E = 'e', NE = 'ne'
        }

        interface HandleEvents {
            pointerdown?: string | ((evt: JQuery.Event) => void);
            pointermove?: string | ((evt: JQuery.Event) => void);
            pointerup?: string | ((evt: JQuery.Event) => void);
        }

        interface Handle {
            name: string,
            position?: HandlePosition,
            events?: HandleEvents
            attrs?: any
        }
    }

    class Halo extends mvc.View<undefined> {

        constructor(options?: Halo.Options);

        extendHandles(props: Halo.Handle): void;

        addHandles(handles: Halo.Handle[]): this;

        addHandle(handle: Halo.Handle): this;

        removeHandles(): this;

        removeHandle(name: string): this;

        changeHandle(name: string, handle: Halo.Handle): this;

        hasHandle(name: string): boolean;

        getHandle(name: string): Halo.Handle | undefined;

        toggleHandle(name: string, selected?: boolean): this;

        selectHandle(name: string): this;

        deselectHandle(name: string): this;

        deselectAllHandles(): this;

        toggleState(toggleName: string): void;

        isOpen(toggleName: string): boolean;

        isRendered(): boolean;

        render(): this;

        static clear(paper: dia.Paper): void;

        protected update(): void;

        protected onHandlePointerDown(evt: JQuery.Event): void;

        protected onPieTogglePointerDown(evt: JQuery.Event): void;

        protected pointermove(evt: JQuery.Event): void;

        protected pointerup(evt: JQuery.Event): void;
    }

    namespace TextEditor {

        interface Options {

            text?: string, // The SVG text element on which we want to enable inline text editing.
            newlineCharacterBBoxWidth?: number, // The width of the new line character. Used for selection of a newline.
            placeholder?: boolean,  // The placeholder in case the text gets emptied.
            focus?: boolean, // Determines if the textarea should gain focus. In some cases, this is not intentional - e.g. if we use the ui.TextEditor for displaying remote cursor.
            debug?: boolean,
            useNativeSelection?: boolean,
            annotateUrls?: boolean,
            urlAnnotation?: {
                attrs?: attributes.NativeSVGAttributes
            },
            textareaAttributes?: {
                autocorrect?: string,
                autocomplete?: string,
                autocapitalize?: string,
                spellcheck?: string,
                tabindex?: string
            }
        }

        interface Selection {
            end: number | null;
            start: number | null;
        }
    }

    class TextEditor extends mvc.View<undefined> {

        constructor(options?: TextEditor.Options);

        render(root?: HTMLElement): this;

        selectAll(): this;

        // Programmatically select portion of the text inside the text editor starting at selectionStart ending at selectionEnd. This method automatically swaps selectionStart and selectionEnd if they are in a wrong order.
        select(selectionStart: number, selectionEnd: number): this

        // Programmatically deselect all the selected text inside the text editor.
        deselect(): this;

        // Return the start character position of the current selection.
        getSelectionStart(): number | null;

        // Return the end character position of the current selection.
        getSelectionEnd(): number | null;

        // Return an object of the form { start: Number, end: Number } containing the start and end position of the current selection. Note that the start and end positions are returned normalized. This means that the start index will always be lower than the end index even though the user started selecting the text from the end back to the start.
        getSelectionRange(): TextEditor.Selection;

        // Return the number of characters in the current selection.
        getSelectionLength(): number;

        // Return the selected text.
        getSelection(): string;

        // Programmatically set the caret position. If opt.silent is true, the text editor will not trigger the 'caret:change' event.
        setCaret(charNum: number, opt?: { [key: string]: any }): this;

        // Programmatically hide the caret.
        hideCaret(): this;

        // Return the text content (including new line characters) inside the text editor.
        getTextContent(): string;

        // Return the start and end character positions for a word under charNum character position.
        getWordBoundary(charNum: number): [number, number] | undefined;

        // Return the start and end character positions for a URL under charNum character position. Return undefined if there was no URL recognized at the charNum index.
        getURLBoundary(charNum: number): [number, number] | undefined;

        // Return the number of characters in the text.
        getNumberOfChars(): number;

        // Return the character position the user clicked on. If there is no such a position found, return the last one.
        getCharNumFromEvent(evt: JQuery.Event): number;

        // This method stores annotation attributes that will be used for the very next insert operation. This is useful, for example, when we have a toolbar and the user changes text to e.g. bold. At this point, we can just call setCurrentAnnotation({ 'font-weight': 'bold' }) and let the text editor know that once the user starts typing, the text should be bold. Note that the current annotation will be removed right after the first text operation came. This is because after that, the next inserted character will already inherit properties from the previous character which is our 'bold' text. (Rich-text specific.)
        setCurrentAnnotation(attrs: attributes.SVGAttributes): void;

        // Set annotations of the text inside the text editor. These annotations will be modified during the course of using the text editor. (Rich-text specific.)
        setAnnotations(annotations: Vectorizer.TextAnnotation | Array<Vectorizer.TextAnnotation>): void;

        // Return the annotations of the text inside the text editor. (Rich-text specific.)
        getAnnotations(): Array<Vectorizer.TextAnnotation> | undefined;

        // Get the combined (merged) attributes for a character at the position index taking into account all the annotations that apply. (Rich-text specific.)
        getCombinedAnnotationAttrsAtIndex(index: number, annotations: Vectorizer.TextAnnotation | Array<Vectorizer.TextAnnotation>): attributes.SVGAttributes;

        // Find a common annotation among all the annotations that fall into the range (an object with start and end properties - normalized). For characters that don't fall into any of the annotations, assume defaultAnnotation (default annotation does not need start and end properties). The common annotation denotes the attributes that all the characters in the range share. If any of the attributes for any character inside range differ, undefined is returned. This is useful e.g. when your toolbar needs to reflect the text attributes of a selection. (Rich-text specific.)
        getSelectionAttrs(range: TextEditor.Selection, annotations: Vectorizer.TextAnnotation): attributes.SVGAttributes;

        findAnnotationsUnderCursor(annotations: Vectorizer.TextAnnotation, selectionStart: number): Array<Vectorizer.TextAnnotation>;

        findAnnotationsInSelection(annotations: Vectorizer.TextAnnotation, selectionStart: number, selectionEnd: number): Array<Vectorizer.TextAnnotation>;

        static edit(el?: SVGElement, opt?: TextEditor.Options): TextEditor;

        static getTextElement(el: SVGElement): SVGElement | undefined;

        static close(): void;

        static setCurrentAnnotation(attrs: attributes.SVGAttributes): void;

        static getAnnotations(): Array<Vectorizer.TextAnnotation> | undefined;

        static setCaret(charNum: number, opt?: { [key: string]: any }): TextEditor;

        static deselect(): TextEditor;

        static selectAll(): TextEditor;

        static select(selectionStart: number, selectionEnd: number): TextEditor;

        static getNumberOfChars(): number;

        static getCharNumFromEvent(evt: JQuery.Event): number;

        static getWordBoundary(charNum: number): [number, number] | undefined;

        static findAnnotationsUnderCursor(): Array<Vectorizer.TextAnnotation>;

        static findAnnotationsInSelection(): Array<Vectorizer.TextAnnotation>;

        static getSelectionAttrs(annotations: Vectorizer.TextAnnotation | Array<Vectorizer.TextAnnotation>): attributes.SVGAttributes;

        static getSelectionLength(): number;

        static getSelectionRange(): TextEditor.Selection;

        protected onKeydown(evt: JQuery.Event): void;

        protected onKeyup(evt: JQuery.Event): void;

        protected onCopy(evt: JQuery.Event): void;

        protected onCut(evt: JQuery.Event): void;

        protected onPaste(evt: JQuery.Event): void;

        protected onAfterPaste(evt: JQuery.Event): void;

        protected onMousedown(evt: JQuery.Event): void;

        protected onMousemove(evt: JQuery.Event): void;

        protected onMouseup(evt: JQuery.Event): void;

        protected onDoubleClick(evt: JQuery.Event): void;

        protected onTripleClick(evt: JQuery.Event): void;

        protected onInput(evt: JQuery.Event): void;

        protected onAfterKeydown(evt: JQuery.Event): void
    }
}

export namespace dia {

    export namespace Paper {

        interface PrintExportOptions {
            size?: string;
            padding?: dia.Padding;
        }

        interface RasterExportOptions {
            type?: 'image/png' | 'image/jpeg' | string;
            height?: number;
            width?: number;
            size?: string;
            backgroundColor?: string;
            quality?: number;
            padding?: dia.Padding;
            area?: dia.BBox;
            useComputedStyle?: boolean;
            stylesheet?: string;
        }

        interface SVGExportOptions {
            preserveDimensions?: boolean;
            area?: dia.BBox;
            convertImagesToDataUris?: boolean;
            useComputedStyles?: boolean;
            stylesheet?: string;
        }
    }

    export interface Paper {

        print(opt?: Paper.PrintExportOptions): void;

        toDataURL(callback: (dataURL: string) => void, opt?: Paper.RasterExportOptions): void;

        toJPEG(callback: (dataURL: string) => void, opt?: Paper.RasterExportOptions): void;

        toPNG(callback: (dataURL: string) => void, opt?: Paper.RasterExportOptions): void;

        toSVG(callback: (svg: string) => void, opt?: Paper.SVGExportOptions): void;

        openAsSVG(opt?: Paper.SVGExportOptions): void;

        openAsPNG(opt?: Paper.RasterExportOptions): void;
    }

    namespace CommandManager {

        export interface Options {
            graph: dia.Graph;
            cmdBeforeAdd?: (eventName: string, ...eventArgs: any[]) => boolean;
            cmdNameRegex?: any; /* a regular expression */
            applyOptionsList?: string[];
            revertOptionsList?: string[];
        }
    }

    class CommandManager extends Backbone.Model {

        constructor(opt: CommandManager.Options);

        undo(opt?: { [key: string]: any }): void;

        redo(opt?: { [key: string]: any }): void;

        cancel(opt: { [key: string]: any }): void;

        hasUndo(): boolean;

        hasRedo(): boolean;

        listen(): void;

        initBatchCommand(): void;

        storeBatchCommand(): void;
    }

    namespace Validator {

        export interface Options {
            commandManager: dia.CommandManager;
            cancelInvalid?: boolean;
        }
    }

    class Validator extends Backbone.Model {

        constructor(opt: Validator.Options);

        validate(...actions: Array<(err: Error, command: any, next: any) => boolean>): Validator;
    }
}

export namespace alg {

    interface PriorityQueueOptions {
        comparator?: (a: number, b: number) => number;
        data: Array<any>
    }

    class PriorityQueue {

        constructor(opt: PriorityQueueOptions)

        isEmpty(): boolean;

        insert(priority: number, value: any, id?: number | string): void;

        peek(): any;

        peekPriority(): number;

        updatePriority(id: number | string, priority: number): void;

        remove(): any;

        bubbleUp(pos: number): void;

        bubbleDown(pos: number): void;
    }

    const Dijkstra: (adjacencyList: any, source: string | number, weight: (aNode: any, bNode: any) => number) => any;
}

export namespace com {

    namespace Channel {
        export interface Options {
            url?: string;
            port: any;
            serverShouldSendGraph: boolean;
            reconnectInterval: number;
            ttl: number;
            query: { [key: string]: any };
            debugLevel: number;
            id: string;
            graph: dia.Graph;
        }

    }

    class Channel extends Backbone.Events {

        constructor(opt: Channel.Options);

        close(): void;

        healthCheck(): void;

        broadcast(message: { [key: string]: any }): void;

        send(): void;

        pause(): void;

        unpause(): void;

        protected initialize(): void;

        protected onClose(socket: any): void;

        protected onMessage(socket: any, message: string): void;

        protected onGraphChange(eventName: string, cell: dia.Cell, graph: dia.Graph, opt?: { [key: string]: any }): void;

        protected onConnection(socket: any, message: any): void;
    }

    class ChannelHub {

        constructor(opt: { port: number });

        route(): void;

        close(): void;

        protected initialize(): void;

        protected onConnection(socket: any, message: any): void;
    }
}

export namespace format {

    namespace getfx {
        export interface ElementOptions {
            id: string | number;
            width: number;
            height: number;
            label: string;
        }

        export interface LinkOptions {
            id: string | number;
            width: number;
            height: number;
            label: string;
        }
    }

    const gexf: (xmlString: string, makeElement: (opt: getfx.ElementOptions) => dia.Element, makeLink: (opt: getfx.LinkOptions) => dia.Link) => Array<dia.Cell>;

}

export namespace layout {

    namespace ForceDirected {
        export interface Options {
            graph: dia.Graph;
            width: number;
            height: number;
            gravityCenter: dia.Point;
            charge?: number;
            linkDistance?: number;
            linkStrength?: number;

        }
    }

    class ForceDirected extends Backbone.Model {

        constructor(opt: ForceDirected.Options);

        start(): void;

        step(): void;
    }

    namespace GridLayout {

        export interface Options {
            centre?: boolean;
            dx?: number;
            dy?: number;
            resizeToFit?: boolean;
            marginX?: number;
            marginY?: number;
            columns?: number;
            columnWidth?: 'compact' | 'auto' | number | string;
            rowHeight?: 'compact' | 'auto' | number | string;
            deep?: boolean;
            parentRelative?: boolean;
        }

        export function layout(graphOrCells: dia.Graph | Array<dia.Cell>, opt?: Options): void;
    }

    namespace TreeLayout {

        interface AttributeNames {
            'siblingRank'?: string;
            'direction'?: string;
            'margin'?: string;
            'offset'?: string;
            'prevSiblingGap'?: string;
            'nextSiblingGap'?: string;
            'firstChildGap'?: string;
        }

        type Direction = 'L' | 'R' | 'T' | 'B' | 'BR' | 'BL' | 'TR' | 'TL';

        type DirectionRule = (rule: [Direction, Direction]) => (direction: Direction) => Direction;

        export interface DirectionRules {
            rotate: DirectionRule;
            flip: DirectionRule;
            straighten: DirectionRule;
        }

        export interface Options {
            graph: dia.Graph;
            gap?: number;
            parentGap?: number;
            siblingGap?: number;
            firstChildGap?: number;
            direction?: Direction;
            directionRule?: DirectionRule;
            updatePosition?: null | ((element: dia.Element, position: dia.Point, opt?: { [key: string]: any }) => void);
            updateVertices?: null | ((link: dia.Link, vertices: Array<dia.Point>, opt?: { [key: string]: any }) => void);
            updateAttributes?: null | ((layoutArea: any, root: dia.Element, rootLink: dia.Link, opt: { [key: string]: any }) => void);
            filter?: null | ((children: dia.Element[], parent: dia.Element | null, opt: { [key: string]: any }) => dia.Element[]);
            attributeNames?: AttributeNames;
        }
    }

    class TreeLayout extends Backbone.Model {

        constructor(opt: TreeLayout.Options);

        layout(opt?: { [key: string]: any }): this;

        layoutTree(root: dia.Element, opt?: { [key: string]: any }): this;

        static directionRules: TreeLayout.DirectionRules
    }
}

export namespace storage {
    const Local: {
        prefix: string;
        insert: (collection: string, doc: any, callback: (err: Error, doc: any) => void) => void;
        find: (collection: string, query: any, callback: (err: Error, docs: Array<any>) => void) => void;
        remove: (collection: string, query: any, callback: (err: Error) => void) => void;
    };
}

export namespace shapes {

    export namespace standard {

        namespace Record {

            type ItemId = string;

            type GroupId = number;

            type ItemSide = 'left' | 'middle' | 'right';

            interface Item {
                id?: ItemId;
                label?: string;
                icon?: string;
                collapsed?: boolean;
                height?: number;
                span?: number;
                highlighted?: boolean;
                group?: string | string[];
                items?: Item[];
            }

            interface ItemIcon {
                width?: number;
                height?: number;
                padding?: number;
            }

            interface ItemTextAttribute {
                textWrap?: boolean;
                ellipsis?: boolean | string;
            }

            interface ItemLabelAttributes extends attributes.SVGTextAttributes {
                itemText?: ItemTextAttribute;
                itemHighlight?: attributes.NativeSVGAttributes
            }

            interface ItemBodyAttributes extends attributes.SVGRectAttributes {
                itemHighlight?: attributes.NativeSVGAttributes
            }

            interface Selectors {
                root?: attributes.SVGAttributes;
                bodiesGroups?: attributes.SVGAttributes;
                labelsGroups?: attributes.SVGAttributes;
                buttonsGroups?: attributes.SVGAttributes;
                forksGroups?: attributes.SVGAttributes;
                iconsGroups?: attributes.SVGAttributes;
                // Bodies of all items
                itemBodies?: ItemBodyAttributes;
                // Bodies of a specific column
                itemBodies_0?: ItemBodyAttributes;
                itemBodies_1?: ItemBodyAttributes;
                itemBodies_2?: ItemBodyAttributes;
                // Labels of all items
                itemLabels?: ItemLabelAttributes;
                /* Labels of a specific column */
                itemLabels_0?: ItemLabelAttributes;
                itemLabels_1?: ItemLabelAttributes;
                itemLabels_2?: ItemLabelAttributes;
                // Specific Item
                // * itemBody_[itemId]?: ItemBodyAttributes;
                // * itemLabel_[itemId]?: ItemLabelAttributes;
                // Specific Column
                // * itemBodies_[n]?: ItemBodyAttributes;
                // * itemLabels_[n]?: ItemLabelAttributes;
                // * group_[n]?: attributes.SVGAttributes;
                // * bodiesGroup_[n]?: attributes.SVGGAttributes;
                // * labelsGroup_[n]?: attributes.SVGAttributes;
                // * buttonsGroup_[n]?: attributes.SVGAttributes;
                // * forskGroup_[n]?: attributes.SVGAttributes;
                // * iconsGroup_[n]?: attributes.SVGAttributes;
                [key: string]: any;
            }

            interface Attributes<T> extends dia.Element.GenericAttributes<T> {
                items?: Item[][];
                itemHeight?: number;
                itemOffset?: number;
                itemMinLabelWidth?: number;
                itemButtonSize?: number;
                itemIcon?: ItemIcon;
                itemOverflow?: boolean;
                padding?: dia.Padding;
            }
        }

        class Record extends dia.Element {
            constructor(
                attributes?: Record.Attributes<Record.Selectors>,
                opt?: dia.Graph.Options
            )

            protected metrics: any;

            item(itemId: Record.ItemId): Record.Item | null;
            item(itemId: Record.ItemId, value: Record.Item, opt?: dia.Cell.Options): this;

            toggleItemCollapse(itemId: Record.ItemId, opt?: dia.Cell.Options): this;

            toggleItemHighlight(itemId: Record.ItemId, opt?: dia.Cell.Options): this;

            isItemVisible(itemId: Record.ItemId): boolean | null;

            isItemCollapsed(itemId: Record.ItemId): boolean | null;

            isItemHighlighted(itemId: Record.ItemId): boolean | null;

            getMinimalSize(): dia.Size;

            getItemPathArray(itemId: Record.ItemId): string[] | null;

            getItemParentId(itemId: Record.ItemId): Record.ItemId | null;

            getItemGroupIndex(itemId: Record.ItemId): number | null;

            getItemSide(itemId: Record.ItemId): Record.ItemSide | null;

            removeItem(itemId: Record.ItemId): this;

            addNextSibling(siblingId: Record.ItemId, item: Record.Item, opt?: dia.Cell.Options): this;

            addPrevSibling(siblingId: Record.ItemId, item: Record.Item, opt?: dia.Cell.Options): this;

            addItemAtIndex(id: Record.ItemId | Record.GroupId, index: number, item: Record.Item, opt?: dia.Cell.Options): this;

            removeInvalidLinks(): dia.Link[];

            isLinkInvalid(link: dia.Link): boolean;

            protected getSelector(selector: string, id: Record.ItemId | Record.GroupId): string;

            protected getGroupSelector(selector: string, ...ids: Array<Record.ItemId | Record.GroupId>): string[];

            protected getItemLabelMarkup(item: Record.Item, x: number, y: number, groupId: Record.GroupId): dia.MarkupNodeJSON;

            protected getItemBodyMarkup(item: Record.Item, x: number, y: number, groupId: Record.GroupId, overflow: number): dia.MarkupNodeJSON;

            protected getIconMarkup(item: Record.Item, x: number, y: number, groupId: Record.GroupId): dia.MarkupNodeJSON;

            protected getButtonMarkup(item: Record.Item, x: number, y: number, groupId: Record.GroupId): dia.MarkupNodeJSON;

            protected getButtonPathData(x: number, y: number, r: number, collapsed: boolean): string;

            protected getForkMarkup(itemId: Record.ItemId): dia.MarkupNodeJSON;

            protected getForkPathData(itemId: Record.ItemId): string;

            protected getItemCacheAttribute(itemId: Record.ItemId, attribute: string): any;
        }

        namespace BorderedRecord {

            interface Selectors extends Record.Selectors {
                body?: attributes.SVGRectAttributes;
            }
        }

        class BorderedRecord extends Record {
            constructor(
                attributes?: Record.Attributes<BorderedRecord.Selectors>,
                opt?: dia.Graph.Options
            )
        }

        namespace HeaderedRecord {

            interface Selectors extends Record.Selectors {
                body?: attributes.SVGRectAttributes;
                header?: attributes.SVGRectAttributes;
                headerLabel?: attributes.SVGTextAttributes;
            }
        }

        class HeaderedRecord extends Record {
            constructor(
                attributes?: Record.Attributes<HeaderedRecord.Selectors>,
                opt?: dia.Graph.Options
            )
        }

        class RecordView extends dia.ElementView {

            protected onItemButtonClick(evt: JQuery): void;
        }

        let HeaderedRecordView: RecordView;
        let BorderedRecordView: RecordView;
    }

    export namespace chart {

        namespace Plot {

            interface Series {
                name: string;
                label?: string;
                data?: dia.Point[];
                interpolate?: 'linear' | 'bezier' | 'step' | 'stepBefore' | 'stepAfter';
                bars?: boolean | {
                    align?: 'middle' | 'left' | 'right';
                    barWidth: number;
                    'top-rx': number;
                    'top-ry': number;
                };
                showLegend?: boolean | ((serie: Plot.Series, stats: any) => boolean);
                legendLabelLineHeight?: number;
                hideFillBoundaries?: boolean;
                showRightFillBoundary?: boolean;
                fillPadding?: {
                    left?: number;
                    right?: number;
                    bottom?: number;
                }
            }

            interface Marking {
                name: string;
                label?: string;
                start?: dia.Point;
                end?: dia.Point;
                attrs?: { [key: string]: any };
            }

            interface Axis {
                min?: number;
                max?: number;
                tickFormat?: string | ((tickValue: number) => string);
                tickSuffix?: string | ((tickValue: number) => string);
                ticks?: number;
                tickStep?: number;
            }

            interface Attributes extends dia.Element.Attributes {
                series?: Series[],
                axis?: {
                    'x-axis'?: Axis,
                    'y-axis'?: Axis
                },
                markings?: Marking[];
                padding?: dia.Padding;
                attrs?: { [key: string]: any };
            }
        }

        namespace Matrix {

            interface Selectors extends shapes.SVGRectSelector, shapes.SVGTextSelector, shapes.SVGPathSelector {
                '.background'?: attributes.SVGAttributes;
                '.cells'?: attributes.SVGAttributes;
                '.foreground'?: attributes.SVGAttributes;
                '.labels'?: attributes.SVGAttributes;
                '.rows'?: attributes.SVGAttributes;
                '.columns'?: attributes.SVGAttributes;
                '.cell'?: attributes.SVGRectAttributes;
                '.label'?: attributes.SVGTextAttributes;
                '.grid-line'?: attributes.SVGPathAttributes;
            }

            interface Attributes extends dia.Element.GenericAttributes<Selectors> {
                cells: Array<Array<attributes.SVGRectAttributes>>,
                labels?: {
                    rows?: Array<attributes.SVGTextAttributes>
                    columns?: Array<attributes.SVGTextAttributes>
                }
            }
        }

        namespace Pie {

            interface Attributes extends dia.Element.GenericAttributes<Selectors> {
                series: Serie[];
                pieHole?: number;
                serieDefaults?: Serie;
                sliceDefaults?: Slice;
            }

            interface Selectors extends shapes.SVGRectSelector, shapes.SVGTextSelector, shapes.SVGPathSelector, shapes.SVGCircleSelector {

                '.background': attributes.SVGAttributes;
                '.data': attributes.SVGAttributes;
                '.foreground': attributes.SVGAttributes;
                '.legend': attributes.SVGAttributes;
                '.legend-items': attributes.SVGAttributes;
                '.caption': attributes.SVGTextAttributes;
                '.subcaption': attributes.SVGTextAttributes;

                '.slice': attributes.SVGAttributes;
                '.slice-fill': attributes.SVGPathAttributes;
                '.slice-border': attributes.SVGPathAttributes;
                '.slice-inner-label': attributes.SVGTextAttributes;
                '.legend-serie': attributes.SVGAttributes;
                '.legend-slice': attributes.SVGAttributes;
            }

            interface Serie {
                data?: Slice[];
                name?: string;
                label?: string;
                startAngle?: number;
                degree?: number;
                showLegend?: boolean;
                labelLineHeight?: number;
            }

            interface Slice {
                value: number;
                label?: string;
                fill?: string;
                innerLabel?: string;
                innerLabelMargin?: number;
                legendLabel?: string;
                legendLabelLineHeight?: number;
                legendLabelMargin?: number;
                offset?: number;
                onClickEffect?: { type: 'enlarge' | 'offset', offset?: number, scale?: number };
                onHoverEffect?: { type: 'enlarge' | 'offset', offset?: number, scale?: number };
            }
        }

        namespace Knob {

            interface Attributes extends dia.Element.GenericAttributes<Selectors> {
                value: number;
                pieHole?: number;
                min?: number;
                max?: number;
                fill?: string;
                sliceDefaults: Pie.Slice;
                serieDefaults: Pie.Serie;
            }

            interface Selectors extends Pie.Attributes {}
        }

        class Plot extends shapes.basic.Generic {

            tickMarkup: string;
            pointMarkup: string;
            barMarkup: string;
            markingMarkup: string;
            serieMarkup: string;
            legendItemMarkup: string;

            constructor(
                attributes?: Plot.Attributes,
                opt?: { [key: string]: any }
            );

            legendPosition(): void;

            addPoint(p: dia.Point, serieName: string, opt?: { [key: string]: any }): void;

            lastPoint(serieName: string): dia.Point;

            firstPoint(serieName: string): dia.Point;
        }

        class Matrix extends shapes.basic.Generic {

            cellMarkup: string;
            labelMarkup: string;
            gridLineMarkup: string;

            constructor(
                attributes?: Matrix.Attributes,
                opt?: { [key: string]: any }
            );
        }

        class Pie extends shapes.basic.Generic {

            sliceMarkup: string;
            sliceFillMarkup: string;
            sliceBorderMarkup: string;
            sliceInnerLabelMarkup: string;
            legendSerieMarkup: string;
            legendSliceMarkup: string;

            constructor(attributes?: Pie.Attributes, opt?: { [key: string ]: any })

            addSlice(slice: Pie.Slice, serieIndex: number, opt?: { [key: string ]: any }): void;

            editSlice(slice: Pie.Slice, sliceIndex: number, serieIndex: number, opt?: { [key: string ]: any }): void;
        }

        class Knob extends shapes.chart.Pie {

            constructor(attributes?: Knob.Attributes, opt?: { [key: string]: any });
        }
    }

    export namespace bpmn {

        export let icons: {
            none: string,
            message: string,
            plus: string,
            cross: string,
            user: string,
            circle: string,
            service: string,
        };

        namespace Activity {

            interface Selectors extends shapes.SVGTextSelector, shapes.SVGRectSelector, shapes.SVGPathSelector, shapes.SVGImageSelector {
                '.body'?: attributes.SVGRectAttributes,
                '.inner'?: attributes.SVGRectAttributes,
                '.outer'?: attributes.SVGRectAttributes,
                '.content'?: attributes.SVGTextAttributes,
                '.sub-process'?: attributes.SVGPathAttributes,
                '.icon'?: attributes.SVGImageAttributes
            }

            interface Attributes extends dia.Element.GenericAttributes<Selectors>{
                activityType?: string;
                content?: string;
                icon?: string;
                subProcess?: boolean;
            }
        }

        class Activity extends shapes.basic.TextBlock {

            icon: string;
            subProcess: boolean;

            constructor(
                attributes?: Activity.Attributes,
                opt?: { [key: string]: any }
            );

            protected _onIconChange(cell: dia.Cell, icon: string): void;

            protected _onSubProcessChange(cell: dia.Cell, subProcess: boolean): void;

            protected onActivityTypeChange(cell: dia.Cell, type: string): void;

            protected onSubProcessChange(cell: dia.Cell, subProcess: boolean): void;
        }

        namespace Annotation {

            interface Selectors extends shapes.SVGTextSelector, shapes.SVGRectSelector, shapes.SVGPathSelector {
                '.body'?: attributes.SVGRectAttributes,
                '.content'?: attributes.SVGTextAttributes,
                '.stroke'?: attributes.SVGPathAttributes
            }

            interface Attributes extends dia.Element.GenericAttributes<Selectors> {
                wingLength?: number;
                content?: string;
            }
        }

        class Annotation extends shapes.basic.TextBlock {

            constructor(
                attributes?: Annotation.Attributes,
                opt?: { [key: string]: any }
            );

            protected onSizeChange(cell: dia.Cell, size: number): void;

            getStrokePathData(width:number, height: number, wingLength: number): string;
        }

        namespace Gateway {

            interface Selectors extends shapes.SVGTextSelector, shapes.SVGImageSelector, shapes.SVGPolygonSelector {
                '.body'?: attributes.SVGPolygonAttributes,
                '.label'?: attributes.SVGTextAttributes
            }

            interface Attributes extends dia.Element.GenericAttributes<Gateway.Selectors> {
                icon?: string;
            }
        }

        class Gateway extends dia.Element {

            icon: string;
            constructor(
                attributes?: Gateway.Attributes,
                opt?: { [key: string]: any }
            );

            protected _onIconChange(cell: dia.Cell, icon: string): void;
        }

        namespace Event {
            interface Selectors extends shapes.SVGCircleSelector, shapes.SVGImageSelector, shapes.SVGTextSelector {
                '.body'?: attributes.SVGCircleAttributes,
                '.outer'?: attributes.SVGCircleAttributes,
                '.inner'?: attributes.SVGCircleAttributes,
                '.label'?: attributes.SVGTextAttributes,
            }

            interface Attributes extends dia.Element.GenericAttributes<Selectors> {
                eventType?: string;
                icon?: string;
            }
        }

        class Event extends dia.Element {

            icon: string;
            constructor(
                attributes?: Event.Attributes,
                opt?: { [key: string]: any }
            );

            protected _onIconChange(cell: dia.Cell, icon: string): void;

            protected onEventTypeChange(cell: dia.Cell, type: string): void;
        }

        namespace Pool {

            interface Selectors extends shapes.SVGTextSelector, shapes.SVGRectSelector {
                '.body'?: attributes.SVGRectAttributes,
                '.header'?: attributes.SVGRectAttributes,
                '.label'?: attributes.SVGTextAttributes,
                '.blackbox-label'?: attributes.SVGTextAttributes,
                '.blackbox-wrap'?: attributes.SVGAttributes,
                '.lanes'?: attributes.SVGAttributes
            }

            interface SubLane {
                label: string;
                name?: string;
                ratio?: number;
                headerWidth?: number;
                sublanes?: SubLane[];
            }

            interface Attributes extends dia.Element.GenericAttributes<Pool.Selectors> {
                lanes?: {
                    label?: string,
                    headerWidth?: number,
                    sublanes?: SubLane[]
                }
            }
        }

        class Pool extends dia.Element {

            constructor(
                attributes?: Pool.Attributes,
                opt?: { [key: string]: any }
            );
        }

        namespace Group {

            interface Selectors extends shapes.SVGTextSelector, shapes.SVGRectSelector {
                '.body'?: attributes.SVGRectAttributes,
                '.label-rect'?: attributes.SVGRectAttributes,
                '.label-group'?: attributes.SVGAttributes,
                '.label-wrap'?: attributes.SVGAttributes,
                '.label'?: attributes.SVGTextAttributes
            }
        }

        class Group extends dia.Element {

            constructor(
                attributes?: dia.Element.GenericAttributes<Group.Selectors>,
                opt?: { [key: string]: any }
            );
        }

        namespace DataObject {

            interface Selectors extends shapes.SVGTextSelector, shapes.SVGPolygonSelector {
                '.body'?: attributes.SVGPolygonAttributes,
                '.label'?: attributes.SVGTextAttributes
            }
        }

        class DataObject extends dia.Element {

            constructor(
                attributes?: dia.Element.GenericAttributes<DataObject.Selectors>,
                opt?: { [key: string]: any }
            );
        }

        namespace Conversation {
            interface Selectors extends shapes.SVGTextSelector, shapes.SVGPolygonSelector, shapes.SVGPathSelector {
                '.body'?: attributes.SVGPolygonAttributes,
                '.label'?: attributes.SVGTextAttributes,
                '.sub-process'?: attributes.SVGPathAttributes,
            }

            interface Attributes extends dia.Element.GenericAttributes<Conversation.Selectors> {
                conversationType?: string;
                subProcess?: boolean;
            }
        }

        class Conversation extends dia.Element {

            subProcess: boolean;
            constructor(
                attributes?: Conversation.Attributes,
                opt?: { [key: string]: any }
            );

            protected _onSubProcessChange(cell: dia.Cell, subProcess: boolean): void;

            protected onConversationTypeChange(cell: dia.Cell, type: string): void;
        }

        namespace Choreography {

            interface Selectors extends shapes.SVGTextSelector, shapes.SVGRectSelector, shapes.SVGPathSelector {
                '.body'?: attributes.SVGRectAttributes,
                '.content'?: attributes.SVGTextAttributes,
                '.participant-label'?: attributes.SVGTextAttributes,
                '.participant-rect'?: attributes.SVGRectAttributes,
                '.label'?: attributes.SVGTextAttributes,
                '.sub-process'?: attributes.SVGPathAttributes,
                '.participants'?: attributes.SVGAttributes

            }

            interface Attributes extends dia.Element.GenericAttributes<Selectors> {
                participants?: string[];
                content?: string;
                initiatingParticipant?: number;
                subProcess?: boolean;
            }

        }

        class Choreography extends shapes.basic.TextBlock {

            subProcess: boolean;
            constructor(
                attributes?: Choreography.Attributes,
                opt?: { [key: string]: any }
            );

            protected _onSubProcessChange(cell: dia.Cell, subProcess: boolean): void;
        }

        namespace Message {

            interface Selectors extends shapes.SVGPolygonSelector, shapes.SVGTextSelector {
                '.body'?: attributes.SVGRectAttributes,
                '.label'?: attributes.SVGTextAttributes,
            }
        }

        class Message extends dia.Element {

            constructor(
                attributes?: dia.Element.GenericAttributes<Message.Selectors>,
                opt?: { [key: string]: any }
            );
        }


        namespace Flow {
            interface Attributes extends dia.Link.Attributes {
                flowType?: string;
            }
        }

        class Flow extends dia.Link {

            constructor(
                attributes?: Flow.Attributes,
                opt?: { [key: string]: any }
            );

            protected onFlowTypeChange(cell: dia.Cell, type: string): void;
        }
    }
}
