var userNumbers = new Set(); // 중복 방지
var winningNumbers = new Set();
var bonusNumber = 0;

        // 사용자가 숫자를 입력하는 함수
        function addNumber() {
            var inputText = document.getElementById("lotto_input_num");
            var userNum = parseInt(inputText.value.trim());

            if (isNaN(userNum) || userNum < 1 || userNum > 45) {
                alert("❌ 1~45 사이의 숫자를 입력하세요.");
                return;
            }

            if (userNumbers.has(userNum)) {
                alert("❌ 중복된 숫자는 입력할 수 없습니다.");
                return;
            }

            if (userNumbers.size >= 6) {
                alert("❌ 이미 6개의 숫자를 입력하셨습니다!");
                return;
            }

            userNumbers.add(userNum);
            document.getElementById("selectedNumbers").innerText = "선택한 번호: " + Array.from(userNumbers).join(", ");
            inputText.value = ""; // 입력 창 초기화
        }

        // 랜덤 로또 번호 생성 (중복 없이 6개)
        function generateLottoNumbers() {
            winningNumbers.clear();
            while (winningNumbers.size < 6) {
                winningNumbers.add(Math.floor(Math.random() * 45) + 1);
            }
            
            // 보너스 번호 생성 (중복 없이)
            do {
                bonusNumber = Math.floor(Math.random() * 45) + 1;
            } while (winningNumbers.has(bonusNumber));
        }

        // 로또 결과 확인 함수
        function checkLotto() {
            if (userNumbers.size !== 6) {
                alert("❌ 6개의 숫자를 모두 입력하세요!");
                return;
            }

            generateLottoNumbers();

            var matchCount = 0;
            userNumbers.forEach(num => {
                if (winningNumbers.has(num)) matchCount++;
            });

            var resultMessage = `🎟️ 입력한 번호: ${Array.from(userNumbers).join(", ")}\n🎯 당첨 번호: ${Array.from(winningNumbers).join(", ")} (보너스: ${bonusNumber})\n`;

            // 등수 판별
            switch (matchCount) {
                case 0:
                case 1:
                case 2:
                    resultMessage += "😭 꽝! 다음 기회에!";
                    break;
                case 3:
                    resultMessage += "🎉 5등 당첨!";
                    break;
                case 4:
                    resultMessage += "🎉 4등 당첨!";
                    break;
                case 5:
                    if (userNumbers.has(bonusNumber)) {
                        resultMessage += "🥈 2등 당첨 (보너스 번호 포함)";
                    } else {
                        resultMessage += "🥉 3등 당첨!";
                    }
                    break;
                case 6:
                    resultMessage += "🏆🎊 1등 당첨!! 축하합니다! 🎊🏆";
                    break;
            }

            document.getElementById("lottoResult").innerText = resultMessage;
        }