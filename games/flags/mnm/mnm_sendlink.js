function sendLink(){
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '청기백기',
        description: '#순발력테스트 #내점수는'+$("#point2").html()+' #청기백기',
        imageUrl:
          'https://mnmsoft.co.kr/content/chung/images/talklink.png',
        link: {
          mobileWebUrl: 'https://mnmsoft.co.kr/content/chung/',
          webUrl: 'https://mnmsoft.co.kr/content/chung/',
        },
      },
    })
}

function rere(){
    location.href = "/content/chung"
}