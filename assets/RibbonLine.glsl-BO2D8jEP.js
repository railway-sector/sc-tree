import{fL as ke,j$ as At,cA as yt,n as _,cw as Wt,cq as Vt,cz as It,rE as Mt,oV as jt,cE as Pe,j3 as bt,c2 as ue,kX as Nt,hJ as kt,_ as Jt,iG as Qe,ae as z,ah as Ut,dX as Oe,j as Bt,sU as Ht,fh as ee,fe as oe,cF as _e,ff as Re,fg as Ke,cU as le,fi as et,hN as Ge,zq as Gt,fj as qt,g0 as se,cI as tt,p_ as Xt,zL as ce,k7 as Yt,eD as Zt,fN as Qt}from"./index-oA6vLpxG.js";import{f as Kt}from"./computeTranslationToOriginAndRotation-BOwWXuDc.js";import{t as ei,a as ti,b as xe,d as ii,x as ai}from"./WebGLLayer-Cpuv-u6c.js";import{t as ni}from"./Attribute-DGhdp5lO.js";import{K as X,D as Dt,ag as ri,a8 as fe,ah as it,u as si,L as qe,N as Xe,O as oi,e as Je,d as li,f as ci,aa as di,E as pi,h as fi,b as hi,c as ui,P as mi,g as zt,i as vi,t as gi,z as at,j as Si,r as nt,ai as ye,l as xi,n as yi,o as bi,aj as Di,ak as rt,al as zi,am as Ti,an as st,p as Pi,s as wi,ao as Li,y as Fe,v as $i,ap as ot,w as Ci,x as lt,aq as Oi,A as _i,B as Ri,ar as ct,m as Fi}from"./OutputColorHighlightOLID.glsl-DTPFeqTC.js";import{U as Ei,j as Ai}from"./BufferView-a_O849qC.js";import{h as Ee,l as Wi,x as Vi,j as Ii,v as Tt}from"./lineSegment-DvrMBjUf.js";import{k as be,X as Z,y as dt,v as we}from"./plane-DItbjdKP.js";import{Q as Mi,t as ji}from"./InterleavedLayout-C1gNUbiq.js";import{O as De,g as Ae,a as pt}from"./renderState-CMNPCd9E.js";import{t as s,n as F,i as P}from"./oitResolution.glsl-1Pf3tzj2.js";import{s as Ni,t as ki,n as Ji,c as Ui,f as Bi,e as Hi}from"./MixExternalColor.glsl-BltRSSMK.js";import{s as Gi}from"./ShaderBuilder-CdJggazR.js";function tn(t,e,a,i,n,r,l,c,o,p,d){const g=ta[d.mode];let h,f,v=0;if(ke(t,e,a,i,o.spatialReference,n,c))return g?.requiresAlignment(d)?(v=g.applyElevationAlignmentBuffer(i,n,r,l,c,o,p,d),h=r,f=l):(h=i,f=n),ke(h,o.spatialReference,f,r,p.spatialReference,l,c)?v:void 0}function Pt(t,e,a,i,n){const r=(ei(t)?t.z:ti(t)?t.array[t.offset+2]:t[2])||0;switch(a.mode){case"on-the-ground":{const l=xe(e,t,"ground")??0;return n.verticalDistanceToGround=0,n.sampledElevation=l,void(n.z=l)}case"relative-to-ground":{const l=xe(e,t,"ground")??0,c=a.geometryZWithOffset(r,i);return n.verticalDistanceToGround=c,n.sampledElevation=l,void(n.z=c+l)}case"relative-to-scene":{const l=xe(e,t,"scene")??0,c=a.geometryZWithOffset(r,i);return n.verticalDistanceToGround=c,n.sampledElevation=l,void(n.z=c+l)}case"absolute-height":{const l=a.geometryZWithOffset(r,i),c=xe(e,t,"ground")??0;return n.verticalDistanceToGround=l-c,n.sampledElevation=c,void(n.z=l)}default:return void(n.z=0)}}function an(t,e,a,i){return Pt(t,e,a,i,de),de.z}function nn(t,e,a){return e==="on-the-ground"&&a==="on-the-ground"?t.staysOnTheGround:e===a||e!=="on-the-ground"&&a!=="on-the-ground"?e==null||a==null?t.definedChanged:1:t.onTheGroundChanged}function rn(t){return t==="relative-to-ground"||t==="relative-to-scene"}function sn(t){return t!=="absolute-height"}function on(t,e,a,i,n){Pt(e,a,n,i,de),qi(t,de.verticalDistanceToGround);const r=de.sampledElevation,l=At(ia,t.transformation);return ze[0]=e.x,ze[1]=e.y,ze[2]=de.z,Kt(e.spatialReference,ze,l,i.spatialReference)?t.transformation=l:console.warn("Could not locate symbol object properly, it might be misplaced"),r}function qi(t,e){for(let a=0;a<t.geometries.length;++a){const i=t.geometries[a].getMutableAttribute("groundDistance");i&&i.data[0]!==e&&(i.data[0]=e,t.geometryVertexAttributeUpdated(t.geometries[a],"groundDistance"))}}function Xi(t,e,a,i,n,r){let l=0;const c=r.spatialReference;e*=3,i*=3;for(let o=0;o<n;++o){const p=t[e],d=t[e+1],g=t[e+2],h=r.getElevation(p,d,g,c,"ground")??0;l+=h,a[i]=p,a[i+1]=d,a[i+2]=h,e+=3,i+=3}return l/n}function Yi(t,e,a,i,n,r,l,c){let o=0;const p=c.calculateOffsetRenderUnits(l),d=c.featureExpressionInfoContext,g=r.spatialReference;e*=3,i*=3;for(let h=0;h<n;++h){const f=t[e],v=t[e+1],M=t[e+2],x=r.getElevation(f,v,M,g,"ground")??0;o+=x,a[i]=f,a[i+1]=v,a[i+2]=d==null?M+x+p:x+p,e+=3,i+=3}return o/n}function Zi(t,e,a,i,n,r,l,c){let o=0;const p=c.calculateOffsetRenderUnits(l),d=c.featureExpressionInfoContext,g=r.spatialReference;e*=3,i*=3;for(let h=0;h<n;++h){const f=t[e],v=t[e+1],M=t[e+2],x=r.getElevation(f,v,M,g,"scene")??0;o+=x,a[i]=f,a[i+1]=v,a[i+2]=d==null?M+x+p:x+p,e+=3,i+=3}return o/n}function Qi(t){const e=t.meterUnitOffset,a=t.featureExpressionInfoContext;return e!==0||a!=null}function Ki(t,e,a,i,n,r,l,c){const o=c.calculateOffsetRenderUnits(l),p=c.featureExpressionInfoContext;e*=3,i*=3;for(let d=0;d<n;++d){const g=t[e],h=t[e+1],f=t[e+2];a[i]=g,a[i+1]=h,a[i+2]=p==null?f+o:o,e+=3,i+=3}return 0}class ea{constructor(){this.verticalDistanceToGround=0,this.sampledElevation=0,this.z=0}}const ta={"absolute-height":{applyElevationAlignmentBuffer:Ki,requiresAlignment:Qi},"on-the-ground":{applyElevationAlignmentBuffer:Xi,requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:Yi,requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:Zi,requiresAlignment:()=>!0}},ia=yt(),de=new ea,ze=_();let aa=class{constructor(e,a){this.vec3=e,this.id=a}};function ft(t,e,a,i){return new aa(Wt(t,e,a),i)}const A={dash:[4,3],dot:[1,3],"long-dash":[8,3],"short-dash":[4,1],"short-dot":[1,1]},na={dash:A.dash,"dash-dot":[...A.dash,...A.dot],dot:A.dot,"long-dash":A["long-dash"],"long-dash-dot":[...A["long-dash"],...A.dot],"long-dash-dot-dot":[...A["long-dash"],...A.dot,...A.dot],none:null,"short-dash":A["short-dash"],"short-dash-dot":[...A["short-dash"],...A["short-dot"]],"short-dash-dot-dot":[...A["short-dash"],...A["short-dot"],...A["short-dot"]],"short-dot":A["short-dot"],solid:null},ra=8;let sa=class{constructor(e,a,i){this.image=e,this.width=a,this.length=i,this.uuid=Vt()}};function wt(t){return t!=null&&"image"in t}function oa(t,e){return t==null?t:{pattern:t.slice(),pixelRatio:e}}function dn(t){return{pattern:[t,t],pixelRatio:2}}function pn(t){switch(t?.type){case"style":return la(t.style);case"image":return new sa(t.image,t.width,t.length);case void 0:case null:return null}return null}function la(t){return t!=null?oa(na[t],ra):null}const ht=8;function ca(t,e){const{vertex:a,attributes:i}=t;a.uniforms.add(new X("intrinsicWidth",l=>l.width));const{hasScreenSizePerspective:n,spherical:r}=e;n?(t.include(Ni,e),ki(a),Dt(a,e),a.uniforms.add(new ri("inverseViewMatrix",(l,c)=>It(ut,Mt(ut,c.camera.viewMatrix,l.origin)))),a.code.add(s`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${r?s`normalize(worldPos + localOrigin)`:s`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):a.code.add(s`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),e.hasVVSize?(i.add("sizeFeatureAttribute","float"),a.uniforms.add(new fe("vvSizeMinSize",l=>l.vvSize.minSize),new fe("vvSizeMaxSize",l=>l.vvSize.maxSize),new fe("vvSizeOffset",l=>l.vvSize.offset),new fe("vvSizeFactor",l=>l.vvSize.factor),new fe("vvSizeFallback",l=>l.vvSize.fallback)),a.code.add(s`
    float getSize(${F(n,"vec3 pos")}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${F(n,"applyLineSizeScreenSizePerspective(size, pos)","size")};
    }
    `)):(i.add("size","float"),a.code.add(s`
    float getSize(${F(n,"vec3 pos")}) {
      float fullSize = intrinsicWidth * size;
      return ${F(n,"applyLineSizeScreenSizePerspective(fullSize, pos)","fullSize")};
    }
    `)),e.hasVVOpacity?(i.add("opacityFeatureAttribute","float"),a.constants.add("vvOpacityNumber","int",8),a.uniforms.add(new it("vvOpacityValues",ht,l=>l.vvOpacity.values),new it("vvOpacityOpacities",ht,l=>l.vvOpacity.opacityValues),new X("vvOpacityFallback",l=>l.vvOpacity.fallback,{supportsNaN:!0})),a.code.add(s`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${F(e.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):a.code.add(s`vec4 applyOpacity(vec4 color) {
return color;
}`),e.hasVVColor?(t.include(si,e),i.add("colorFeatureAttribute","float"),a.code.add(s`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(i.add("color","vec4"),a.code.add(s`vec4 getColor() {
return applyOpacity(color);
}`))}const ut=yt();function da(t){t.vertex.code.add("#define noPerspectiveWrite(x, w) (x * w)")}function Ue(t){t.fragment.code.add("#define noPerspectiveRead(x) (x * gl_FragCoord.w)")}function pa(t){return t.pattern.map(e=>Math.round(e*t.pixelRatio))}function fa(t){if(t==null)return 1;const e=pa(t);return Math.floor(e.reduce((a,i)=>a+i))}function ha(t){return t==null?jt:t.length===4?t:Pe(ua,t[0],t[1],t[2],1)}const ua=bt();function ma(t,e){if(!e.stippleEnabled)return void t.fragment.code.add(s`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);const a=!(e.draped&&e.stipplePreferContinuous),{vertex:i,fragment:n}=t;e.draped||(Dt(i,e),i.uniforms.add(new qe("worldToScreenPerDistanceRatio",({camera:r})=>1/r.perScreenPixelRatio)).code.add(s`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),t.varyings.add("vStippleDistance","float"),t.varyings.add("vStippleDistanceLimits","vec2"),t.varyings.add("vStipplePatternStretch","float"),i.code.add(s`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${s.float(va)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),Xe(i),i.code.add(s`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${a?"patternLength":"1e4"}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),n.uniforms.add(new oi("stipplePatternTexture",r=>r.stippleTexture),new X("stipplePatternPixelSizeInv",r=>1/Lt(r))),e.stippleOffColorEnabled&&n.uniforms.add(new Je("stippleOffColor",r=>ha(r.stippleOffColor))),t.include(Ue),e.worldSizedImagePattern?(t.varyings.add("vStippleV","float"),t.fragment.include(Ji),n.code.add(s`vec4 getStippleColor(out bool isClamped) {
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = vStippleDistance * stipplePatternPixelSizeInv;
float v = vStippleV == -1.0 ? 0.5 : vStippleV;
return texture(stipplePatternTexture, vec2(u, v));
}
vec4 getStippleColor() {
bool ignored;
return getStippleColor(ignored);
}
float getStippleSDF() {
vec4 color = getStippleColor();
return color.a == 0.0 ? -0.5 : 0.5;
}
float getStippleAlpha(float lineWidth) {
return getStippleColor().a;
}
vec4 blendStipple(vec4 color, float stippleAlpha) {
vec4 stippleColor = getStippleColor();
int mixMode  = 1;
vec3 col = mixExternalColor(color.rgb, vec3(1.0), stippleColor.rgb, mixMode);
float opacity = mixExternalOpacity(color.a, 1.0, stippleColor.a, mixMode);
return vec4(col, opacity);
}`)):n.code.add(s`
    float getStippleSDF(out bool isClamped) {
      float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
      float lineSizeInv = noPerspectiveRead(vLineSizeInv);

      vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
      isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;

      float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
      u = fract(u);

      float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;

      return (sdf - 0.5) * vStipplePatternStretch + 0.5;
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha(float lineWidth) {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);
      float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${e.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `),n.code.add(s`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${F(!e.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }
  `)}function Lt(t){const e=t.stipplePattern;return wt(e)?e.length:e?fa(e)/e.pixelRatio:1}const va=.4,$t=64,ga=$t/2,Sa=ga/5,xa=$t/Sa,fn=.25;function ya(t,e){const a=t.vertex,i=e.hasScreenSizePerspective;Xe(a),a.uniforms.get("markerScale")==null&&a.constants.add("markerScale","float",1),a.constants.add("markerSizePerLineWidth","float",xa).code.add(s`
  float getLineWidth(${F(i,"vec3 pos")}) {
     return max(getSize(${F(i,"pos")}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),e.space===2&&(a.constants.add("maxSegmentLengthFraction","float",.45),a.uniforms.add(new qe("perRenderPixelRatio",n=>n.camera.perRenderPixelRatio)),a.code.add(s`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${F(i,"pos")})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${F(i,"pos")})) * screenToWorldRatio;
  }
  `))}const ba=s`vec4(0.0, 0.0, 2.0, 1.0)`,Da=ue(1),za=ue(1);function Ta(t,e){const{hasAnimation:a,animation:i}=e;if(!a)return;const{attributes:n,varyings:r,vertex:l,fragment:c}=t;n.add("timeStamps","vec4"),r.add("vTimeStamp","float"),r.add("vFirstTime","float"),r.add("vLastTime","float"),r.add("vTransitionType","float"),l.main.add(s`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`),i===3&&c.constants.add("decayRate","float",2.3),c.code.add(s`
    float getTrailOpacity(float x) {
      if (x < 0.0) {
        return 0.0;
      }

      ${Pa(i)}
    }`),c.uniforms.add(new X("timeElapsed",o=>o.timeElapsed),new X("trailLength",o=>o.trailLength),new X("speed",o=>o.animationSpeed),new Ui("startEndTime",o=>Nt(wa,o.startTime,o.endTime))),c.constants.add("fadeInTime","float",za),c.constants.add("fadeOutTime","float",Da),c.constants.add("incomingTransition","int",0),c.constants.add("outgoingTransition","int",2),c.code.add(s`float fadeIn(float x) {
return smoothstep(0.0, fadeInTime, x);
}
float fadeOut(float x) {
return isinf(fadeOutTime) ? 1.0 : smoothstep(fadeOutTime, 0.0, x);
}
void updateAlphaIf(inout float alpha, bool condition, float newAlpha) {
alpha = condition ? min(alpha, newAlpha) : alpha;
}
vec4 animate(vec4 color) {
float startTime = startEndTime[0];
float endTime = startEndTime[1];
float totalTime = vLastTime - vFirstTime;
float actualFadeOutTime = min(fadeOutTime * speed, trailLength);
float longStreamlineThreshold = (fadeInTime + 1.0) * speed + actualFadeOutTime;
bool longStreamline = totalTime > longStreamlineThreshold;
float totalTimeWithFadeOut = longStreamline && actualFadeOutTime != trailLength ? totalTime : totalTime + actualFadeOutTime;
float fadeOutStartTime = longStreamline ? totalTime - actualFadeOutTime : totalTime;
float originTime =  -vFirstTime;
float actualEndTime = int(vTransitionType) == outgoingTransition ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
float alpha = getTrailOpacity((totalTimeWithFadeOut - (vTimeStamp - vFirstTime)) / trailLength);
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
animatedColor.a *= alpha;
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTimeWithFadeOut);
float shiftedTimeElapsed = timeElapsed - relativeStartTime + originTime;
float headRelativeToFirst = mod(shiftedTimeElapsed * speed, totalTimeWithFadeOut);
float vRelativeToHead = headRelativeToFirst - originTime - vTimeStamp;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (startTime > timeElapsed) {
return vec4(0.0);
}
float alpha = getTrailOpacity(vRelativeToHead / trailLength);
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, int(vTransitionType) != incomingTransition, step(startTime, vAbsoluteTime));
updateAlphaIf(alpha, headRelativeToFirst > fadeOutStartTime, fadeOut((headRelativeToFirst - fadeOutStartTime) / speed));
alpha *= fadeIn(vTimeStamp - vFirstTime);
animatedColor.a *= alpha;
return animatedColor;
}`)}function Pa(t){switch(t){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return"return 1.0;"}}const wa=kt(),Ye=1;function Ct(t){const e=new Gi,{attributes:a,varyings:i,vertex:n,fragment:r}=e,{applyMarkerOffset:l,draped:c,output:o,capType:p,stippleEnabled:d,falloffEnabled:g,roundJoins:h,wireframe:f,innerColorEnabled:v,hasAnimation:M,hasScreenSizePerspective:x,worldSizedImagePattern:D}=t;n.inputs.add("position",()=>"position"),r.include(Bi),e.include(ca,t),e.include(ma,t),e.include(li,t),e.include(Ta,t);const B=l&&!c;B&&(n.uniforms.add(new X("markerScale",m=>m.markerScale)),e.include(ya,{space:2,hasScreenSizePerspective:x})),ci(n,t),n.uniforms.add(new di("inverseProjectionMatrix",m=>m.camera.inverseProjectionMatrix),new pi("nearFar",m=>m.camera.nearFar),new X("miterLimit",m=>m.join!=="miter"?0:m.miterLimit),new Hi("viewport",m=>m.camera.fullViewport)),n.constants.add("LARGE_HALF_FLOAT","float",65500),n.constants.add("EPS","float",.001),n.constants.add("NUM_JOIN_SUBDIVISIONS","float",t.numJoinSubdivisions),a.add("position","vec3"),a.add("previousDelta","vec4"),a.add("nextDelta","vec4"),a.add("lineParameters","vec2"),a.add("u0","float"),i.add("vColor","vec4"),i.add("vpos","vec3",{invariant:!0}),i.add("vLineDistance","float"),i.add("vLineWidth","float"),d||(i.add("vIsInsideJoin","int"),i.add("vStretchFactor","float"),i.add("vJoinCenterLineSDFs","vec2"),i.add("vSubdivisionFactor","float"));const q=d;q&&i.add("vLineSizeInv","float");const N=p===2,u=d&&N,$=g||u;$&&i.add("vLineDistanceNorm","float"),N&&(i.add("vSegmentSDF","float"),i.add("vReverseSegmentSDF","float")),n.code.add(s`vec3 perpendicular(vec3 v) {
return vec3(v.y, -v.x, 0.0);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec3 rotateZ(vec3 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return vec3(m * v.xy, v.z);
}`),n.code.add(s`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
posNdc.z /= posNdc.w;
return posNdc;
}`),n.code.add(s`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),Xe(n),n.constants.add("aaWidth","float",d?0:1).main.add(s`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      gl_Position = ${ba};
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);

      bool isJoin = abs(lineParameters.y) < 3.0;
  `),B&&n.main.add(s`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),e.include(da),n.main.add(s`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec3 left = (pos.xyz - prev.xyz);
      vec3 right = (next.xyz - pos.xyz);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${F(x,"clippedPos")});
      ${F(d&&x,"float patternLineSize = getSize(clippedCenter);")}
      ${F(d&&!x,"float patternLineSize = lineSize;")}

      ${F(D,s`
          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio * worldToScreenRatio;
          if (lineWidth < 1.0) {
            coverage = lineWidth;
            lineWidth = 1.0;
          }
        `,s`
          if (lineSize < 1.0) {
            coverage = lineSize; // convert sub-pixel coverage to alpha
            lineSize = 1.0;
          }

          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio;
        `)}

      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${q?s`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:""}
  `),(d||N)&&n.main.add(s`
      float isEndVertex = float(!isStartVertex);
      vec3 segmentOrigin = mix(pos.xyz, prev.xyz, isEndVertex);
      vec3 segment = mix(right, left, isEndVertex);
      ${N?s`vec3 segmentEnd = mix(next.xyz, pos.xyz, isEndVertex);`:""}
    `),n.main.add(s`left = (leftLen > EPS) ? left/leftLen : vec3(0.0, 0.0, 0.0);
right = (rightLen > EPS) ? right/rightLen : vec3(0.0, 0.0, 0.0);
vec3 segmentDirection = isStartVertex ? right : left;
vec3 capDisplacementDir = vec3(0.0, 0.0, 0.0);
vec3 joinDisplacementDir = vec3(0.0, 0.0, 0.0);
float displacementLen = lineWidth;
float miterDisplacementLen = lineWidth;
float innerDisplacementLen = lineWidth;`),d||n.main.add(s`vIsInsideJoin = 0;
vStretchFactor = 1.0;
vSubdivisionFactor = 0.0;
vJoinCenterLineSDFs = vec2(LARGE_HALF_FLOAT);`),n.main.add(s`float subdivisionFactor = 0.0;
bool isOutside = false;
if (isJoin) {
isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
vec3 joinDirection = normalize(left + right);
joinDisplacementDir = perpendicular(joinDirection);
if (leftLen > EPS && rightLen > EPS) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
miterDisplacementLen = displacementLen;
innerDisplacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
if (!isOutside) {
displacementLen = innerDisplacementLen;
}
}
subdivisionFactor = lineParameters.x;`),d||n.main.add(s`if(subdivisionFactor > 0.0) {
vIsInsideJoin = 1;
}
vSubdivisionFactor = isOutside ? subdivisionFactor : 0.5;
if (miterDisplacementLen > miterLimit * lineWidth) {
vec2 leftScreenDir = left.xy;
vec2 rightScreenDir = right.xy;
float leftScreenLen = length(leftScreenDir);
float rightScreenLen = length(rightScreenDir);
if (leftScreenLen > EPS && rightScreenLen > EPS) {
leftScreenDir /= leftScreenLen;
rightScreenDir /= rightScreenLen;
float theta = acos(clamp(dot(leftScreenDir, rightScreenDir), -1.0, 1.0));
float subdividedTriangleHeight = (innerDisplacementLen + lineWidth) * cos(theta / (2.0 + 2.0 * NUM_JOIN_SUBDIVISIONS));
float bevelTriangleHeight = innerDisplacementLen + lineWidth * cos(theta * 0.5);
float triangleHeight = NUM_JOIN_SUBDIVISIONS > 0.0 ? subdividedTriangleHeight : bevelTriangleHeight;
vStretchFactor = noPerspectiveWrite(max(triangleHeight / (2.0 * lineWidth), 1.0), pos.w);
}
}`),n.main.add(s`if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),h?n.main.add(s`
        vec3 startDir = leftLen < EPS ? right : left;
        startDir = perpendicular(startDir);

        vec3 endDir = rightLen < EPS ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${d?s`min(1.0, subdivisionFactor * ((NUM_JOIN_SUBDIVISIONS + 1.0) / NUM_JOIN_SUBDIVISIONS))`:s`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir.xy, endDir.xy), -1.0, 1.0));
        joinDisplacementDir = rotateZ(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):n.main.add(s`
        vec3 startDir = perpendicular(leftLen < EPS ? right : left);
        vec3 endDir = perpendicular(rightLen < EPS ? left : right);

        ${F(d,s`joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? endDir : startDir;`,s`joinDisplacementDir = mix(startDir, endDir, subdivisionFactor);`)}
  `);const E=p!==0;return n.main.add(s`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${E?s`capDisplacementDir = vec3((isStartVertex ? -right : left).xy, 0.0);`:""}
    }
  `),n.main.add(s`
    // Displacement (in pixels) caused by join/or cap
    vec2 dposXY = (joinDisplacementDir.xy * sign(lineParameters.y) + capDisplacementDir.xy) * displacementLen;

    /**
     * To prevent z-fighting between layers, we also adjust the z value.
     * We want to ensure that the orientation of the final triangles is the same, regardless of the line width.
     * To do so, the below formula projects the xy displacement onto the original segment direction
     * to find the z-offset necessary so the triangle orientation is independent of the width.
     */
    float dposZ = dot(dposXY, segmentDirection.xy) / dot(segmentDirection.xy, segmentDirection.xy) * segmentDirection.z;
    vec3 dpos = vec3(dposXY, dposZ);

    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${$?s`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xyz += dpos;
  `),d||n.main.add(s`if (isJoin) {
vec2 joinCenterToVertex = dposXY;
vec2 leftCenterlineDir = left.xy;
vec2 rightCenterlineDir = right.xy;
float leftCenterlineLen = length(leftCenterlineDir);
float rightCenterlineLen = length(rightCenterlineDir);
leftCenterlineDir = leftCenterlineLen > EPS ? leftCenterlineDir / leftCenterlineLen : vec2(1.0, 0.0);
rightCenterlineDir = rightCenterlineLen > EPS ? rightCenterlineDir / rightCenterlineLen : leftCenterlineDir;
vJoinCenterLineSDFs = noPerspectiveWrite(
vec2(
dot(vec2(rightCenterlineDir.y, -rightCenterlineDir.x), joinCenterToVertex),
dot(vec2(leftCenterlineDir.y, -leftCenterlineDir.x), joinCenterToVertex)
),
pos.w
);
}`),N&&n.main.add(s`vec2 segmentDir = normalize(segment.xy);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin.xy, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd.xy, -segmentDir)), pos.w);`),d&&(c?n.uniforms.add(new qe("worldToScreenRatio",m=>1/m.screenToPCSRatio)):n.main.add(s`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),n.main.add(s`float segmentLengthScreenDouble = length(segment.xy);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),c?n.main.add(s`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):n.main.add(s`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),n.uniforms.add(new X("stipplePatternPixelSize",m=>Lt(m))),n.main.add(s`
      float patternLength = patternLineSize * stipplePatternPixelSize;

      ${F(D,s`
          float uu = mix(u0, u0 - segmentLengthRender, isEndVertex);
          vStippleDistanceLimits = vec2(uu, uu + segmentLengthRender);
          vStipplePatternStretch = 1.0;

          // The v-coordinate used in case of an image pattern.
          bool isLeft = sign(lineParameters.y) < 0.0;
          vStippleV = isLeft ? 0.0 : 1.0;
        `,s`
          // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the
          // fragment shader
          vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
        `)}

      vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of
      // joins)
      if (segmentLengthScreenDouble >= EPS) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1]
        // at the original vertex positions, and slightly outside of that range at the displaced positions
        vec3 stippleDisplacement = pos.xyz - segmentOrigin;
        float stippleDisplacementFactor = dot(segment.xy, stippleDisplacement.xy) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
      }

      // Cancel out perspective correct interpolation because we want this length the really represent the screen
      // distance
      vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
      vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);

      // Disable stipple distance limits on caps
      vStippleDistanceLimits = isJoin ?
                                 vStippleDistanceLimits :
                                 isStartVertex ?
                                  vec2(-1e34, vStippleDistanceLimits.y) :
                                  vec2(vStippleDistanceLimits.x, 1e34);
    `)),n.main.add(s`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;
      pos.z = pos.z * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${f&&!c?"pos.z -= EPS * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),e.fragment.include(fi,t),e.include(hi,t),r.include(ui),r.main.add(s`discardBySlice(vpos);`),e.include(Ue),r.include(mi),r.main.add(s`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${F($,s`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),f?r.main.add(s`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(N&&r.main.add(s`float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);
float fragmentRadius = length(fragmentPosition);
float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5;
float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);
if (capCoverage < alphaCutoff) {
discard;
}`),u?r.main.add(s`vec2 stipplePosition = vec2(
min(getStippleSDF() * 2.0 - 1.0, 0.0),
lineDistanceNorm
);
float stippleRadius = length(stipplePosition * lineWidth);
float stippleCapSDF = (stippleRadius - lineWidth) * 0.5;
float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
float stippleAlpha = step(alphaCutoff, stippleCoverage);`):r.main.add(s`float stippleAlpha = getStippleAlpha(lineWidth);`),o!==11&&r.main.add(s`discardByStippleAlpha(stippleAlpha, alphaCutoff);`),e.include(Ue),r.uniforms.add(new Je("intrinsicColor",m=>m.color)).main.add(s`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),v&&r.uniforms.add(new Je("innerColor",m=>m.innerColor??m.color),new X("innerWidth",(m,Y)=>m.innerWidth*Y.camera.pixelRatio)).main.add(s`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),r.main.add(s`vec4 finalColor = blendStipple(color, stippleAlpha);`),g&&(r.uniforms.add(new X("falloff",m=>m.falloff)),r.main.add(s`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),d||r.main.add(s`float stretchFactor = vIsInsideJoin == 1 ? noPerspectiveRead(vStretchFactor) : 1.0;
float featherWidth = 2.0;
float featherStartDistance = max(lineWidth - featherWidth / stretchFactor, 0.0);
float straightFeatherStartDistance = max(lineWidth - featherWidth, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
vec2 joinCenterSDFs = noPerspectiveRead(vJoinCenterLineSDFs);
float joinCenterDistance = abs(vSubdivisionFactor > 0.5 ? joinCenterSDFs.x : joinCenterSDFs.y);
float straightFeather = (joinCenterDistance - straightFeatherStartDistance) / (lineWidth - straightFeatherStartDistance);
feather = vIsInsideJoin == 1 ? max(feather, straightFeather) : feather;
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),M&&r.main.add(s`
        finalColor = animate(finalColor);

        ${F(o!==11,s`
            if (finalColor.a <= alphaCutoff) {
              discard;
            }`)}
      `)),r.main.add(s`outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),e}const La=Object.freeze(Object.defineProperty({__proto__:null,build:Ct,ribbonlineNumRoundJoinSubdivisions:Ye},Symbol.toStringTag,{value:"Module"}));function Ot(t){const e=Mi().vec3f("position").vec4f16("previousDelta").vec4f16("nextDelta").f32("u0").vec2f16("lineParameters");return t.hasVVColor?e.f32("colorFeatureAttribute"):e.vec4u8("color",{glNormalized:!0}),t.hasVVSize?e.f32("sizeFeatureAttribute"):e.f32("size"),t.hasVVOpacity&&e.f32("opacityFeatureAttribute"),zt()&&e.vec4u8("olidColor"),t.hasAnimation&&e.vec4f16("timeStamps"),e}let Be=class extends vi{constructor(t,e){super(t,e,ji(Ot(e))),this.shader=new gi(La,()=>Jt(()=>Promise.resolve().then(()=>Na),void 0)),this.ignoreUnused=!0,this.primitiveType=e.wireframe?Qe.LINES:Qe.TRIANGLE_STRIP}_makePipelineState(t,e){const{output:a,hasOccludees:i}=t;return De({blending:bi(a,!1,t.emissionDimmingPass),depthTest:yi(a),depthWrite:xi(t),colorWrite:Ae,stencilWrite:i?nt:null,stencilTest:i?e?at:Si:null,polygonOffset:ye(t)})}initializePipeline(t){if(t.occluder){const{hasOccludees:e}=t;this._occluderPipelineTransparent=De({blending:pt,polygonOffset:ye(t),depthTest:rt,depthWrite:null,colorWrite:Ae,stencilWrite:null,stencilTest:e?Di:null}),this._occluderPipelineOpaque=De({blending:pt,polygonOffset:ye(t),depthTest:e?rt:st,depthWrite:null,colorWrite:Ae,stencilWrite:e?Ti:null,stencilTest:e?zi:null}),this._occluderPipelineMaskWrite=De({blending:null,polygonOffset:ye(t),depthTest:st,depthWrite:null,colorWrite:null,stencilWrite:e?nt:null,stencilTest:e?at:null})}return this._occludeePipeline=this._makePipelineState(t,!0),this._makePipelineState(t,!1)}getPipeline(t,e,a){if(a)return this._occludeePipeline;switch(t.occluder){case 11:return this._occluderPipelineTransparent??super.getPipeline(t,e,a);case 10:return this._occluderPipelineOpaque??super.getPipeline(t,e,a);default:t.occluder;case void 0:case null:return this._occluderPipelineMaskWrite??super.getPipeline(t,e,a)}}};Be=z([Ut("esri.views.3d.webgl-engine.shaders.RibbonLineTechnique")],Be);const $a=16,Ca=8;class T extends Pi{constructor(e){super(),this.spherical=e,this.capType=0,this.emissionSource=0,this.animation=2,this.polygonOffsetIndex=0,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.numJoinSubdivisions=1,this.roundJoins=!1,this.applyMarkerOffset=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.hasScreenSizePerspective=!1,this.worldSizedImagePattern=!1,this.textureCoordinateType=0,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1}get hasAnimation(){return this.animation!==0}}z([P({count:3})],T.prototype,"capType",void 0),z([P({count:8})],T.prototype,"emissionSource",void 0),z([P({count:4})],T.prototype,"animation",void 0),z([P({count:$a})],T.prototype,"polygonOffsetIndex",void 0),z([P()],T.prototype,"writeDepth",void 0),z([P()],T.prototype,"draped",void 0),z([P()],T.prototype,"stippleEnabled",void 0),z([P()],T.prototype,"stippleOffColorEnabled",void 0),z([P()],T.prototype,"stipplePreferContinuous",void 0),z([P({count:Ca})],T.prototype,"numJoinSubdivisions",void 0),z([P()],T.prototype,"roundJoins",void 0),z([P()],T.prototype,"applyMarkerOffset",void 0),z([P()],T.prototype,"hasVVSize",void 0),z([P()],T.prototype,"hasVVColor",void 0),z([P()],T.prototype,"hasVVOpacity",void 0),z([P()],T.prototype,"falloffEnabled",void 0),z([P()],T.prototype,"innerColorEnabled",void 0),z([P()],T.prototype,"hasOccludees",void 0),z([P()],T.prototype,"occluder",void 0),z([P()],T.prototype,"wireframe",void 0),z([P()],T.prototype,"discardInvisibleFragments",void 0),z([P()],T.prototype,"hasScreenSizePerspective",void 0),z([P()],T.prototype,"worldSizedImagePattern",void 0);let Oa=class extends wi{constructor(e,a){super(e,Ra),this.produces=new Map([[2,i=>Li(i)||Fe(i)&&this.parameters.renderOccluded===8],[3,i=>$i(i)],[10,i=>ot(i)&&this.parameters.renderOccluded===8],[11,i=>ot(i)&&this.parameters.renderOccluded===8],[4,i=>Fe(i)&&this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[8,i=>Fe(i)&&!this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[18,i=>Ci(i)]]),this._configuration=new T(a)}updateConfiguration(e){super.updateConfiguration(e);const a=e.slot===18,i=this.parameters.stipplePattern!=null&&this.parameters.stippleTexture!=null&&e.output!==10,n=i&&a&&this.parameters.isImagePattern();this._configuration.draped=a,this._configuration.polygonOffset=this.parameters.polygonOffset,this._configuration.stippleEnabled=i,this._configuration.stippleOffColorEnabled=i&&this.parameters.stippleOffColor!=null,this._configuration.stipplePreferContinuous=i&&this.parameters.stipplePreferContinuous,this._configuration.numJoinSubdivisions=_t(this.parameters.join,i),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins=this.parameters.join==="round",this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=this.parameters.markerParameters!=null&&Ea(this.parameters.markerParameters),this._configuration.polygonOffsetIndex=this.parameters.polygonOffsetIndex,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&this.parameters.innerColor!=null,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=e.hasOccludees,this._configuration.occluder=this.parameters.renderOccluded===8,this._configuration.wireframe=this.parameters.wireframe,this._configuration.animation=this.parameters.animation,this._configuration.emissionSource=this.emissions?1:0,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective&&!n,this._configuration.worldSizedImagePattern=n}get visible(){return this.parameters.color[3]>=lt||this.parameters.stipplePattern!=null&&(this.parameters.stippleOffColor?.[3]??0)>lt}get emissions(){return this.parameters.emissiveStrength>0?this.parameters.renderOccluded!==8?2:1:0}setParameters(e,a){e.animation=this.parameters.animation,super.setParameters(e,a)}intersectDraped({attributes:e,screenToWorldRatio:a},i,n,r,l){if(!i.options.selectionMode)return;const c=e.get("size");let o=this.parameters.width;if(this.parameters.vvSize){const x=e.get("sizeFeatureAttribute").data[0];Number.isNaN(x)?o*=this.parameters.vvSize.fallback[0]:o*=Oe(this.parameters.vvSize.offset[0]+x*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else c&&(o*=c.data[0]);const p=n[0],d=n[1],g=(o/2+4)*a;let h=Number.MAX_VALUE,f=0;const v=e.get("position").data,M=He(this.parameters,e)?v.length-2:v.length-5;for(let x=0;x<M;x+=3){const D=v[x],B=v[x+1],q=(x+3)%v.length,N=p-D,u=d-B,$=v[q]-D,E=v[q+1]-B,m=Oe(($*N+E*u)/($*$+E*E),0,1),Y=$*m-N,C=E*m-u,w=Y*Y+C*C;w<h&&(h=w,f=x/3)}h<g*g&&r(l.distance,l.normal,f)}intersect(e,a,i,n,r,l){const{options:c,camera:o,rayBegin:p,rayEnd:d}=i;if(!c.selectionMode||!e.visible||!o)return;if(!Ei(a))return void Bt.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");const g=e.attributes,h=g.get("position").data;let f=this.parameters.width;if(this.parameters.vvSize){const u=g.get("sizeFeatureAttribute").data[0];Number.isNaN(u)||(f*=Oe(this.parameters.vvSize.offset[0]+u*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0]))}else g.has("size")&&(f*=g.get("size").data[0]);const v=Aa;Ht(v,i.point);const M=f*o.pixelRatio,x=4*o.pixelRatio,D=M/2+x;ee(he[0],v[0]-D,v[1]+D,0),ee(he[1],v[0]+D,v[1]+D,0),ee(he[2],v[0]+D,v[1]-D,0),ee(he[3],v[0]-D,v[1]-D,0);for(let u=0;u<4;u++)if(!o.unprojectFromRenderScreen(he[u],ie[u]))return;be(o.eye,ie[0],ie[1],Ie),be(o.eye,ie[1],ie[2],Me),be(o.eye,ie[2],ie[3],je),be(o.eye,ie[3],ie[0],Ne);let B=Number.MAX_VALUE,q=0;const N=He(this.parameters,g)?h.length-2:h.length-5;for(let u=0;u<N;u+=3){V[0]=h[u]+a[12],V[1]=h[u+1]+a[13],V[2]=h[u+2]+a[14];const $=(u+3)%h.length;if(I[0]=h[$]+a[12],I[1]=h[$+1]+a[13],I[2]=h[$+2]+a[14],Z(Ie,V)<0&&Z(Ie,I)<0||Z(Me,V)<0&&Z(Me,I)<0||Z(je,V)<0&&Z(je,I)<0||Z(Ne,V)<0&&Z(Ne,I)<0)continue;const E=o.projectToRenderScreen(V,Wa),m=o.projectToRenderScreen(I,Va);if(E==null||m==null)continue;if(E[2]<0&&m[2]>0){oe(Q,V,I);const w=o.frustum,W=-Z(w[4],V)/_e(Q,dt(w[4]));if(Re(Q,Q,W),Ke(V,V,Q),!o.projectToRenderScreen(V,E))continue}else if(E[2]>0&&m[2]<0){oe(Q,I,V);const w=o.frustum,W=-Z(w[4],I)/_e(Q,dt(w[4]));if(Re(Q,Q,W),Ke(I,I,Q),!o.projectToRenderScreen(I,m))continue}else if(E[2]<0&&m[2]<0)continue;E[2]=0,m[2]=0;const Y=Ee(E,m,xt),C=Wi(Y,v);if(!(C>=B)){if(this.parameters.screenSizePerspective){const w=this.computeScreenSizePerspectiveWidth(Y,V,I,v,o,f,x);if(C>=w*w)continue}B=C,le(gt,V),le(St,I),q=u/3}}if(B<D*D){let u=Number.MAX_VALUE;if(Vi(Ee(gt,St,xt),Ee(p,d,Ia),K)){oe(K,K,p);const $=et(K);Re(K,K,1/$),u=$/Ge(p,d)}l(u,K,q)}}createBufferWriter(){return new Fa(Ot(this.parameters),this.parameters)}createGLMaterial(e){return new _a(e)}validateParameters(e){e.join!=="miter"&&(e.miterLimit=0),e.markerParameters!=null&&(e.markerScale=e.markerParameters.width/e.width)}update(e){return!!this.parameters.hasAnimation&&(this.setParameters({timeElapsed:Gt(e.time)},!1),e.dt!==0)}computeScreenSizePerspectiveWidth(e,a,i,n,r,l,c){const o=Ii(e,n);qt(Ve,a,i,o),se(vt,Ve,r.viewMatrix);const p=et(vt),d=this.computeCameraAbsCosAngle(Ve,r,this._configuration.spherical);return mt.update(d,p,this.parameters.screenSizePerspective,this.parameters.screenSizePerspectiveMinPixelReferenceSize),mt.apply(l)*r.pixelRatio/2+c}computeCameraAbsCosAngle(e,a,i){return i?tt(K,e):ee(K,0,0,1),oe(Te,e,a.eye),tt(Te,Te),Math.abs(_e(K,Te))}};class _a extends Ri{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures?.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){const{stipplePattern:a}=this._material.parameters;return this._stipplePattern!==a&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(a,this._stipplePattern)}),this._stipplePattern=a),this.getTechnique(Be,e)}}class Ra extends _i{constructor(){super(...arguments),this._width=0,this.color=Xt,this.join="miter",this.cap=0,this.miterLimit=5,this.writeDepth=!0,this.polygonOffset=0,this.polygonOffsetIndex=0,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1,this.timeElapsed=ue(0),this.animation=0,this.animationSpeed=1,this.trailLength=1,this.startTime=ue(0),this.endTime=ue(1/0),this.emissiveStrength=0}get width(){return this.isImagePattern()?this.stipplePattern.width:this._width}set width(e){this._width=e}get transparent(){return this.color[3]<1||this.hasAnimation||this.stipplePattern!=null&&(this.stippleOffColor?.[3]??0)<1}get hasAnimation(){return this.animation!==0}isImagePattern(){return wt(this.stipplePattern)&&this.stippleTexture!=null}}class Fa{constructor(e,a){this.layout=e,this._parameters=a,this.numJoinSubdivisions=_t(this._parameters.join,this._parameters.stipplePattern!=null)}_isClosed(e){return He(this._parameters,e)}allocate(e){return this.layout.createBuffer(e)}elementCount(e){const i=e.get("position").indices.length/2+1,n=this._isClosed(e);let r=n?2:4;return r+=((n?i:i-1)-(n?0:1))*(2*this.numJoinSubdivisions+4),r+=2,this._parameters.wireframe&&(r=2+4*(r-2)),r}write(e,a,i,n,r,l){const{buffer:c,offset:o}=r,p=this.layout,d=i.get("position"),g=d.indices,h=d.data.length/3,f=i.get("distanceToStart")?.data;g&&g.length!==2*(h-1)&&console.warn("RibbonLineMaterial does not support indices");const v=p.fields.has("sizeFeatureAttribute");let M=1,x=null;if(v){const S=i.get("sizeFeatureAttribute");S.data.length===1?M=S.data[0]:x=S.data}else M=i.get("size")?.data[0]??1;let D=[1,1,1,1],B=0,q=null;const N=p.fields.has("colorFeatureAttribute");if(N){const S=i.get("colorFeatureAttribute");S.data.length===1?B=S.data[0]:q=S.data}else D=i.get("color")?.data??D;const u=i.get("timeStamps")?.data,$=u&&p.fields.has("timeStamps"),E=p.fields.has("opacityFeatureAttribute");let m=0,Y=null;if(E){const S=i.get("opacityFeatureAttribute");S.data.length===1?m=S.data[0]:Y=S.data}const C=new Float32Array(c.buffer),w=Ai(c.buffer),W=new Uint8Array(c.buffer),ae=p.stride/4;let b=o*ae;const Le=b;let k=0;const $e=f?(S,G,re)=>k=f[re]:(S,G,re)=>k+=Ge(S,G),ne=C.BYTES_PER_ELEMENT/w.BYTES_PER_ELEMENT,Ze=4/ne,Rt=zt(),H=(S,G,re,U,ve,Ft,ge,Et)=>{C[b++]=G[0],C[b++]=G[1],C[b++]=G[2],ct(S,G,w,b*ne),b+=Ze,ct(re,G,w,b*ne),b+=Ze,C[b++]=Et;let te=b*ne;if(w[te++]=ve,w[te++]=Ft,b=Math.ceil(te/ne),N)C[b]=q?.[ge]??B;else{const J=Math.min(4*ge,D.length-4),Se=4*b;W[Se]=255*D[J],W[Se+1]=255*D[J+1],W[Se+2]=255*D[J+2],W[Se+3]=255*D[J+3]}if(b++,C[b++]=x?.[ge]??M,E&&(C[b++]=Y?.[ge]??m),Rt){let J=4*b;n?(W[J++]=n[0],W[J++]=n[1],W[J++]=n[2],W[J++]=n[3]):(W[J++]=0,W[J++]=0,W[J++]=0,W[J++]=0),b=Math.ceil(.25*J)}$&&(te=b*ne,w[te++]=U[0],w[te++]=U[1],w[te++]=U[2],w[te++]=U[3],b=Math.ceil(te/ne))};b+=ae,ee(y,d.data[0],d.data[1],d.data[2]),$&&Pe(j,u[0],u[1],u[2],u[3]),e&&se(y,y,e);const me=this._isClosed(i);if(me){const S=d.data.length-3;ee(R,d.data[S],d.data[S+1],d.data[S+2]),e&&se(R,R,e)}else ee(L,d.data[3],d.data[4],d.data[5]),e&&se(L,L,e),H(y,y,L,j,1,-4,0,0),H(y,y,L,j,1,4,0,0),le(R,y),le(y,L),$&&Pe(j,u[4],u[5],u[6],u[7]);const Ce=me?0:1,pe=me?h:h-1;for(let S=Ce;S<pe;S++){const G=(S+1)%h*3;ee(L,d.data[G],d.data[G+1],d.data[G+2]),e&&se(L,L,e),$e(R,y,S),H(R,y,L,j,0,-1,S,k),H(R,y,L,j,0,1,S,k);const re=this.numJoinSubdivisions;for(let U=0;U<re;++U){const ve=(U+1)/(re+1);H(R,y,L,j,ve,-1,S,k),H(R,y,L,j,ve,1,S,k)}if(H(R,y,L,j,1,-2,S,k),H(R,y,L,j,1,2,S,k),le(R,y),le(y,L),$){const U=(S+1)%h*4;Pe(j,u[U],u[U+1],u[U+2],u[U+3])}}me?(ee(L,d.data[3],d.data[4],d.data[5]),e&&se(L,L,e),k=$e(R,y,pe),H(R,y,L,j,0,-1,Ce,k),H(R,y,L,j,0,1,Ce,k)):(k=$e(R,y,pe),H(R,y,y,j,0,-5,pe,k),H(R,y,y,j,0,5,pe,k)),We(C,Le+ae,C,Le,ae),b=We(C,b-ae,C,b,ae),this._parameters.wireframe&&this._addWireframeVertices(c,Le,b,ae)}_addWireframeVertices(e,a,i,n){const r=new Float32Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT),l=new Float32Array(e.buffer,a*Float32Array.BYTES_PER_ELEMENT,i-a);let c=0;const o=p=>c=We(l,p,r,c,n);for(let p=0;p<l.length-1;p+=2*n)o(p),o(p+2*n),o(p+1*n),o(p+2*n),o(p+1*n),o(p+3*n)}}function We(t,e,a,i,n){for(let r=0;r<n;r++)a[i++]=t[e++];return i}function He(t,e){return t.isClosed?e.get("position").indices.length>2:!1}function Ea(t){return t.anchor===1&&t.hideOnShortSegments&&t.placement==="begin-end"&&t.worldSpace}function _t(t,e){const a=e?1:0;switch(t){case"miter":case"bevel":return a;case"round":return Ye+a}}const mt=new Oi,V=_(),I=_(),Ve=_(),vt=_(),Te=_(),Q=_(),K=_(),Aa=_(),Wa=ce(),Va=ce(),gt=_(),St=_(),xt=Tt(),Ia=Tt(),R=_(),y=_(),L=_(),j=bt(),he=[ce(),ce(),ce(),ce()],ie=[_(),_(),_(),_()],Ie=we(),Me=we(),je=we(),Ne=we();class un{constructor(e){this._originSR=e,this._rootOriginId="root/"+Yt(),this._origins=new Map,this._objects=new Map,this._gridSize=5e5,this._originSR?.isGeographic&&(this._gridSize/=Zt(this._originSR)),this._baselineDistance=.5*this._gridSize;const a=this._baselineDistance*Ma;this._baselineObjectSize=a/ja}getOrigin(e){const a=this._origins.get(this._rootOriginId);if(a==null){const d=ft(e[0]+Math.random()-.5,e[1]+Math.random()-.5,e[2]+Math.random()-.5,this._rootOriginId);return this._origins.set(this._rootOriginId,d),d}const i=this._gridSize,n=Math.round(e[0]/i),r=Math.round(e[1]/i),l=Math.round(e[2]/i),c=`${n}/${r}/${l}`;let o=this._origins.get(c);const p=.5*i;if(oe(O,e,a.vec3),O[0]=Math.abs(O[0]),O[1]=Math.abs(O[1]),O[2]=Math.abs(O[2]),O[0]<p&&O[1]<p&&O[2]<p){if(o){const d=Math.max(...O);if(oe(O,e,o.vec3),O[0]=Math.abs(O[0]),O[1]=Math.abs(O[1]),O[2]=Math.abs(O[2]),Math.max(...O)<d)return o}return a}return o||(o=ft(n*i,r*i,l*i,c),this._origins.set(c,o)),o}needsOriginUpdate(e,a,i){const n=Ge(e.vec3,a),r=Math.max(1,i/this._baselineObjectSize);return n>this._baselineDistance*r}_drawOriginBox(e,a=Qt(1,1,0,1)){const i=window.view,n=i.stage,r=a.toString();if(!this._objects.has(r)){this._material=new Oa({width:2,color:a},!1);const f=new ii(n,{pickable:!1}),v=new ai({castShadow:!1});f.add(v),this._objects.set(r,v)}const l=this._objects.get(r),c=[0,1,5,4,0,2,1,7,6,2,0,1,3,7,5,4,6,2,0],o=c.length,p=new Array(3*o),d=new Array,g=.5*this._gridSize;for(let f=0;f<o;f++)p[3*f]=e[0]+(1&c[f]?g:-g),p[3*f+1]=e[1]+(2&c[f]?g:-g),p[3*f+2]=e[2]+(4&c[f]?g:-g),f>0&&d.push(f-1,f);ke(p,this._originSR,0,p,i.renderSpatialReference,0,o);const h=new Fi(this._material,[["position",new ni(p,d,3,!0)]],null,2);l.addGeometry(h)}get test(){}}const O=_(),Ma=2**-23,ja=.05,Na=Object.freeze(Object.defineProperty({__proto__:null,build:Ct,ribbonlineNumRoundJoinSubdivisions:Ye},Symbol.toStringTag,{value:"Module"}));export{ea as A,Oa as H,rn as a,dn as b,an as c,un as d,ca as e,nn as f,on as g,ya as h,$a as i,da as j,$t as k,tn as l,sn as m,Ue as n,ga as o,qi as p,fn as q,pn as r,ba as s,ft as t,Pt as u};
