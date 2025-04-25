# 노트

## 이벤트

useEffect에 존재하는 dom과 react의 dom은 다른 취급, 이벤트 전파 자체는 실행되지만 다른 기본 메서드들은 둘 사이에서는 호환이 안됨. stopPropagation 및 preventDefault()

addEventListener로 추가된 이벤트 => on 이벤트.

## react 이벤트

1. React의 이벤트 시스템은 어떻게 작동하냐면:
   React는 모든 이벤트를 document나 root 요소에서 듣고 있어요.

그래서 우리가 <button onClick={...} /> 이런 식으로 코드를 짜도, 실제로는 React가 document에서 click 이벤트를 듣고 있고, 이벤트가 버블링되면 그걸 잡아서 React의 핸들러를 실행하는 거예요.

즉, React의 이벤트는 버블링 단계에서만 작동합니다.

2. stopPropagation()을 쓰면?
   그 이벤트는 더 이상 상위로 버블링되지 않습니다

즉, React가 듣고 있던 document까지 이벤트가 도달하지 않아요

그래서 React의 onClick이 호출되지 않는 겁니다

3. 이 경우 버튼을 클릭해도 React onClick 로그는 안 찍혀요. 왜냐하면 stopPropagation() 때문에 이벤트가 <div>나 document까지 올라가지 않아서, React가 그걸 모르고 지나치기 때문입니다.

## 모달 관련

1. absolute는 stciky를 제외한 모든 포지션 참조가능.
2. document.documentElement의 overflow를 hidden으로 설정, scrollbar-width를 none으로 설정하면 스크린 lock 구현 가능. overflow를 unset으로 전환해도 scrollY값은 그대로 남아있기 때문에 원래 위치를 잃지 않는다.

## 번외

autobatching 기능으로 성능을 향상시키려다 보니까, 동기적으로 동작해야하는 작업들이 비동기적으로 실행됐구나

"성능을 향상시키려고 autobatching을 도입했는데, 그 결과 일부 동기적으로 동작해야 했던 작업들이 '느린 비동기처럼' 실행되어버린 것"

🔄 다시 말하면:
setState() 자체는 즉시 실행되지만,

렌더링과 상태 반영이 지연되면서,

개발자가 의도한 “순차적 동기 흐름”이 깨지기 시작한 거죠.

그런데도 성능향상을 무시 못하니까 함부로 메커니즘에 어긋나는 훅을 지양하려다보니 함수기반 렌더링을 쓰고, 안정성을 높이려고 타입검사로 함수인지 체크하니 선택적으로 컨텍스트를 쓰게 됐구나

🧩 1. 성능은 절대 포기할 수 없다
React는 UI 프레임워크라기보다는 상태 기반 렌더링 엔진에 가까워요.
렌더링 최적화는 생명줄이에요.

그래서 autobatching, concurrent mode, suspense, startTransition, memo 등
모든 진화 방향이 성능을 중심으로 설계돼 있음.

🧠 2. 성능 최적화와 “동기 코드의 직관성”은 충돌함
js
복사
편집
setState(1);
console.log(state); // 예상대로 안 나옴
➡️ 개발자는 동기 흐름을 기대
➡️ React는 비동기처럼 최적화

이 간극을 코드 레벨에서 컨트롤하기 위해 → 함수 기반 렌더링, render prop 패턴 등장

🔐 3. 그래서 children을 함수로 받는다 (render prop / function-as-child)
jsx
복사
편집
<Disclosure>
{({ open }) => (
<Disclosure.Button>Toggle</Disclosure.Button>
)}
</Disclosure>
➡️ 렌더 타이밍, context 범위, 상태 전달 전부 명확하게 통제 가능
➡️ React는 이 방식이 안정성 + 예측 가능성을 확보해준다고 판단

🔍 4. 안정성을 위해 타입 검사도 들어간다
Headless UI 내부 보면 이런 거 있어요:

ts
복사
편집
if (typeof children === 'function') {
return children(context);
} else {
return children;
}
➡️ 함수면 render-prop 스타일로 처리
➡️ 아니면 일반 children으로 처리
✅ 선택적 context 적용의 핵심 포인트

즉, 개발자가 "이 컴포넌트는 상태를 받고 싶어" 하면 함수로 넘기고,
"그냥 구조만 짜고 싶어" 하면 일반 children으로 넘김
→ 선택적 context 연결 완성

✨ 이 모든 걸 한 줄로 요약하면?
"성능 최적화를 유지하면서도, 동기적 직관성과 안정성을 확보하려다 보니 render prop + 타입 체크로 선택적 컨텍스트 구조가 만들어졌다."

정확히 그겁니다. 완벽한 정리 👏👏

## 해결필요
