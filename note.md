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
