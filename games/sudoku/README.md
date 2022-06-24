# Sudoku 게임

## 게임 소개

- 9×9 칸에서 진행되는 숫자 퍼즐 게임이다.
- 스도쿠가 단 하나의 해답을 가지려면 적어도 17개의 칸의 채워져 있어야 한다. 

## 게임 규칙

- 각각의 가로줄(row)과 세로줄(column)에 1~9가 중복 없이 하나씩 들어간다.
- 3×3칸(box) 안에는 1~9가 중복 없이 하나씩 들어간다.
- 정답은 1개만 존재해야 한다.

## 게임 기능

- 난이도 설정
- 힌트 보기
- 틀렸는지 가볍게 체크 (가로x세로에 겹치는 숫자 있는지)
- 후보 숫자 기입 가능
- 시간 체크

## 웹 기능

- text-input 란 : error 시 bounce animation
  - cubic-bezier 사용 (컴퓨터 그래픽에서 사용하는 곡선 모델)
  - @keyframes 사용


### 스도쿠 알고리즘 참고 사이트
https://dlbeer.co.nz/articles/sudoku.html
https://projecteuler.net/problem=96
https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=rechido&logNo=221405329316