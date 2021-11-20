export default (username: string, authUrl: string) => {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <style>
        @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
      </style>
    </head>
    <body style="background-color: #ededed">
      <div style="width: 100%">
        <div
          style="
            max-width: 600px;
            margin: 0 auto;
            padding: 60px 0 30px 0;
            font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
              Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
              'Noto Sans KR', 'Malgun Gothic', sans-serif;
            font-size: 16px;
            line-height: 1.5;
            background-color: #ffffff;
          "
        >
          <div
            align="center"
            style="padding-right: 0px; padding-left: 0px"
            class="logo-area"
          >
            <div style="font-size: 1px; line-height: 20px">&nbsp;</div>
            <a
              href="https://modoo.asdf.land"
              style="outline: none"
              target="_blank"
            >
              <img
                align="center"
                border="0"
                src="https://user-images.githubusercontent.com/48921632/142720998-87ec793b-0c09-44f4-9344-552fd124c162.png"
                alt="Logo"
                title="Logo"
                style="
                  text-decoration-line: none;
                  height: auto;
                  border: none;
                  width: 100%;
                  max-width: 143px;
                  display: block;
                "
                width="143"
            /></a>
            <div style="font-size: 1px; line-height: 20px">&nbsp;</div>
          </div>
  
          <hr
            style="
              border: 0;
              border-top: solid 1px #e2e2e2;
              width: 90%;
              margin: 30px auto;
            "
            class="horizontal-line"
          />
          <div
            align="center"
            style="
              max-width: 90%;
              margin-left: auto;
              margin-right: auto;
              margin-top: 40px;
            "
            class="nomal-paragraph"
          >
            <div style="font-weight: 600; font-size: max(2vw, 29px)">
              안녕하세요, ${username}님!
            </div>
            <div style="margin-top: 35px; margin-bottom: 35px">
              모두리스트와 함께해주셔서 감사합니다!<br />아래 버튼을 눌러
              회원가입을 마무리해주세요.
            </div>
            <div align="center">
              <a href="https://modoo.asdf.land/mailcert/${authUrl}">
                <img
                  src="https://user-images.githubusercontent.com/48921632/142731420-2c14539a-139a-4fd5-9d8d-d27ab47046a7.png"
                  style="width: 140px"
                />
              </a>
            </div>
          </div>
  
          <div
            style="
              max-width: 90%;
              margin-left: auto;
              margin-right: auto;
              margin-top: 40px;
            "
            class="nomal-paragraph"
          ></div>
  
          <div
            align="center"
            style="
              padding-top: 40px;
              padding-right: 10px;
              padding-bottom: 10px;
              padding-left: 10px;
            "
          ></div>
        </div>
      </div>
    </body>
  </html>`;
};
