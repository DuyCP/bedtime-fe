import { Box, Button, Text } from '@mantine/core'
import { IconDatabase, IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import StoryItem, { IStory } from '../StoryItem'

const MY_STORIES = [
  {
    _id: '64098257cb88f44f4fb77dd2',
    title: 'Truyện cổ tích ba chú heo con',
    content:
      'Ngày xưa có một bà mẹ heo sinh được ba chú heo con. Ba chú heo hay ăn nên lớn rất nhanh, khi thấy những đứa con của mình cũng đã lớn, bà mẹ heo mới nói với ba chú heo con rằng:\r\n\r\n“Các con giờ cũng đã lớn cả rồi, không còn bé bỏng như ngày xưa nữa. Giờ cũng là lúc ta cho các con ra đi và các con phải tự xây cho mỗi đứa một căn nhà. Nhưng các con phải cẩn thận, đừng để gặp chó sói mà nó bắt ăn thịt”.\r\n\r\nBa chú heo con bắt đầu lên đường, các chú tự bảo với nhau rằng: “Ba anh em chúng ta phải cẩn thận, đừng để chó Sói bắt ăn thịt nhé”.\r\n\r\nĐi được một đoạn đường thì 3 chú heo gặp một bác nông dân đang vác trên mình một bó rơm to. Ba chú heo đứng lại chào bác nông dân, Chú heo cả nói với bác: “Bác nông dân ơi, bác cho cháu bó rơm này nhé, cháu sẽ tự làm cho mình một ngôi nhà bằng rơm”.\r\n\r\nBác nông dân vui vẻ trả lời: “Cháu định làm một ngôi nhà bằng rơm thật sao cậu bé, được thôi ta cho cháu cả bó rơm này đó”.\r\n\r\nChú heo cả vui mừng lấy số rơm mà bác nông dân cho và dựng một ngôi nhà bằng rơm. Dựng xong chú nói: “Giờ ta đã có một ngôi nhà bằng rơm để ở, chó sói không bao giờ bắt được ta để ăn thịt nữa”\r\n\r\nChú heo thứ 2 nói: “Em sẽ tự mình làm một ngôi nhà chắc chắn hơn ngôi nhà bằng rơm của anh”\r\n\r\nChú heo út nói: “Em cũng vậy, ngôi nhà bằng rơm của anh rất mong manh, không thể chống lại được gió lớn, em cũng sẽ làm cho mình một ngôi nhà chắc chắn”\r\n\r\nChú heo thứ 2 và chú heo út tiếp tục lên đường còn chú heo cả thì ở lại với ngôi nhà bằng rơm vừa làm được. Đi được một đoạn đường thì 2 chú heo gặp một bác tiều phu đang vác trên mình một bó cành cây lớn.\r\n\r\nChú heo thứ 2 nói với bác tiều phu: “Bác tiều phu ơi, bác cho cháu bó cây này, cháu muốn làm cho mình một ngôi nhà bằng những cành cây trên”.\r\n\r\nBác tiều phu mỉm cười nói: “Được thôi cậu bé, bác cho cháu hết số cành cây này đó, nếu được cháu hãy thử dựng cho mình một ngôi nhà xem sao”.\r\n\r\nĐược bác tiều phu cho hết số cành cây, chú heo thứ hai liền dựng cho mình một ngôi nhà bằng cành cây, dựng xong chú nói: “Ngôi nhà bằng cành cây này nhìn trông chắc chắn hơn ngôi nhà bằng rơm của anh cả rất nhiều, giờ thì không có con sói nào ăn thịt được ta nữa”.\r\n\r\nChú heo út nói: “Em sẽ dựng cho mình một ngôi nhà vững trãi hơn ngôi nhà bằng cành cây của anh”.\r\n\r\nThế là chú heo út tiếp tục một mình lên đường, còn chú heo thứ hai thì ở lại với ngôi nhà mà chú vừa mới làm xong. Đi được một quãng đường, chú heo út gặp một bác thợ xây đang kéo trên xe rất nhiều viên gạch.\r\n\r\nChú heo út đứng lại chào bác, chú nói: “Bác thợ xây ơi, bác có thể cho cháu số gạch trên được không bác?, cháu sẽ xây cho mình một ngôi nhà bằng gạch”.\r\n\r\n” Được thôi, chú bé,” Bác ấy cho chú heo con một số gạch.\r\n\r\nRồi chú heo út tự mình xây một ngôi nhà bằng gạch. Phải mất thời gian khá lâu mới hoàn thành, không sao vì đó là một ngôi nhà chắc chắn.\r\n\r\nChú heo út rất hài lòng với căn nhà của mình. Chú nói, ” Bây giờ, Chó sói sẽ không bao giờ bắt và ăn thịt ta được”\r\n\r\nHôm sau một chó sói xuất hiện trên đường. Nó đi đến ngôi nhà bằng rơm của chú heo cả. Khi trông thấy chó sói, chú heo cả vội vàng chạy vào nhà và đớng cửa lại.\r\n\r\nChó sói gõ cửa và nói, ” Này heo con, này heo con, mở cửa cho ta vào với.”\r\n\r\n” Không, không” chú heo con nói. ” Ta đã thề, ta đã thề, Ta không để mi vào.”\r\n\r\n” Được rồi Ta bực mình và ta bực mình và Ta sẽ thổi tung căn nhà của ngươi,” chó sói gầm gừ.\r\n\r\nNói rồi nó thổi và nó thổi,nó thổi và nó thổi. Ngôi nhà bằng rơm xập xuống, chó sói ăn thịt chú heo cả dễ dàng”\r\n\r\nHôm sau chó sói vẫn dọc theo con đường đi xa hơn. Nó đến ngôi nhà bằng cành cây của chú heo kế. Chú heo kế trông thấy chó sói, liền chạy vào nhà đóng cửa lại.\r\n\r\nChó sói gõ cửa và nói, ” Này heo con, này heo con, hãy mở cửa cho ta vào.”\r\n\r\n” Không, không,” chú heo con nói. ” Ta đã thề, ta đã thề, Ta không để mi vào.”\r\n\r\n” Được rồi Ta bực mình và ta bực mình và Ta sẽ thổi tung căn nhà của ngươi,” chó sói gầm gừ.\r\n\r\nNói rồi nó thổi và nó thổi,nó thổi và nó thổi. Ngôi nhà bằng cây xập xuống, chó sói ăn thịt chú heo kế dễ dàng”\r\n\r\nHôm sau chó sói vẫn dọc theo con đường đi xa hơn nữa. Nó đến ngôi nhà bằng gạch của chú heo út. Chú heo út trông thấy chó sói, liền chạy vào nhà đóng cửa lại.\r\n\r\nChó sói gõ cửa và nói, ” Này heo con, này heo con, hãy mở cửa cho ta vào.”\r\n\r\n” Không, không,” chú heo con nói. ” Ta đã thề, ta đã thề, Ta không để mi vào.”\r\n\r\n” Được rồi Ta bực mình và ta bực mình và Ta sẽ thổi tung căn nhà của ngươi,” chó sói gầm gừ.\r\n\r\nNói rồi nó thổi và nó thổi, nó thổi và nó thổi. Nhưng căn nhà bằng gạch thật chắc chắn không hề ngã xập. Chó sói giận quá, nhưng nó giả vờ như không có chuyện gì xảy ra. Nó nghĩ, ” Chú heo con này rất thông minh. Nếu mình muốn bắt nó, mình phải giả vờ thân thiện mới được”\r\n\r\nNghĩ như thế nó nói, ” Này chú heo con, lúc sáu giờ sáng ngày mai, tôi sẽ dẫn bạn đến trang trại của ông Smith. Chúng ta sẽ lấy những củ cải tươi ngon cho bữa tối.”\r\n\r\n“Oh! Tốt quá,” Chú heo con nói. Nhưng chú heo út rất thông minh. Chú biết rất rõ chó sói chỉ mong ăn thịt chú thôi.\r\n\r\nVì thế sáng hôm sau chú heo út khởi hành đến trang trại của nhà nông Smith lúc năm giờ. Chú lấy đầy giỏ củ cải và hối hả quay trở về nhà trước sáu giờ.\r\n\r\nĐúng sáu giờ, chó sói đến gõ cửa nhà chú heo. ” Bạn đã chuẩn bị chưa, bạn heo con?” nó nói.\r\n\r\n“Oh! Tôi đã đến cánh đồng của ông Smith rồi,” chú heo con nói. ” Tôi đã lấy đầy giỏ củ cải và đang nấu cho bữa ăn tối đây.”\r\n\r\nChó sói giận quá, nhưng vẫn tiếp tục giả vờ.\r\n\r\nSau đó chó sói nói tiếp, ” Vậy sáng ngày mai bạn chuẩn bị nhé, lúc năm giờ tôi sẽ dẫn bạn đến cây táo của nhà nông Brown. Chúng ta sẽ hái những quả táo đỏ tươi.”\r\n\r\n“Ồ! Tốt quá,” Chú heo con nói.\r\n\r\nSáng hôm sau, chú heo con lên đường lúc bốn giờ. Chú tìm được cây táo. Chú trèo lên cây, trong lúc đang hái táo, chó sói bỗng xuất hiện.\r\n\r\nChú heo con hoảng sợ, nhưng chú giả vờ bình thường. Chú nói, ” Đây là những quả táo ngon nhất, ông Sói. Tôi ném cho ông một trái nhé”.\r\n\r\nChú ném xuống một trái táo, trái táo lăn tròn cách xa con đường. Chó sói chạy theo nhặt. Chú heo con liền leo xuống. Chú chạy một mạch về nhà và đóng cửa lại.\r\n\r\nChó sói vô cùng giận dữ, nhưng vẫn giả vờ bình thường. Nó đi đến căn nhà của chú heo con và gõ cửa. ” Này heo con,” nó gọi, ” Nếu bạn chuẩn bị sẵn sàng lúc bốn giờ chiều nay, tôi sẽ dẫn bạn đi hội chợ. Chúng ta sẽ thích thú khi chơi đánh đu và cưỡi ngựa vòng xoay.\r\n\r\n“Ồ! Tốt quá,” chú heo nói.\r\n\r\nLúc hai giờ trưa chú heo con đi dến hội chợ. Chú vô cùng thích thú với những trò chơi đánh đu và cưỡi ngựa vòng xoay. Sau đó chú heo con mua một thùng đựng bơ. Cái thùng trông giống như một thùng rượu lớn. Chú heo con trở về nhà và trông thấy chó sói đang đi lên đồi. Chú sợ quá, nhảy ngay vào thùng đựng bơ. Thùng đựng bơ bắt đầu lăn tròn lăn tròn xuống đồi. Càng lúc lăn càng nhanh. Nó húc chó sói ngã nhào. Chó sói ngơ ngẩn không biết cái gì đã húc vào mình. Nó sợ quá chạy trối chết. Chú heo con nhảy ra khỏi thùng đựng bơ và vác nó về nhà.\r\n\r\nHôm sau chó sói đến nhà chú heo con và gõ cửa. Nó nói, ” Bạn heo ơi, Tôi không đi được hội chợ ngày hom qua. Ôi chao, một cái gì đó to lắm lăn từ trên đồi xuống và húc vào tôi.”\r\n\r\n“Ha  ha” chú heo nói, ” Tôi đó, tôi ở trong thùng đựng bơ “\r\n\r\nKhi chó sói nghe như vậy, cơn giận dâng lên, dâng lên, dâng lên.\r\n\r\nNó nói, “Này heo con, ta sẽ ăn thịt mi. Ta sẽ leo lên ống khói và xuống bắt mi.”\r\n\r\nChú heo con hoảng sợ, nhưng chú nói không sao. Chú đặt một nồi nước to trên lửa, nấu sôi lên. Chó sói leo lên mái nhà. Nó chui vào ống khói và leo xuống. Chú heo con mở nắp nồi nuớc sôi. Chó sói rơi từ trên ống khói xuống ngay nồi nước rất mạnh. Thế là hết đời chó sói. Chú heo út quá thông minh so với chó sói.',
    banner:
      'https://commun1ty-dev.s3-ap-southeast-1.amazonaws.com/test/1678344779368_24ecf297-c2f4-4885-ac7a-1686c8ee9c3b-hand-drawn-three-little-pigs-illustration_23-2149844176.avif',
    status: 'approved',
    tags: [],
    categories: ['nuoc-ngoai', '0-3'],
    listened: 0,
    updatedAt: '2023-03-09T07:32:14.129Z',
    approvedAt: '2023-03-09T07:32:14.129Z',
    duration: 254,
  },
  {
    _id: '64098033cb88f44f4fb77d8a',
    title: 'Truyện cổ tích nàng tiên ốc',
    content:
      'Ngày xưa, ở một ngôi làng nọ, có một bà lão nghèo sống bằng việc đi mò cua bắt ốc qua ngày. Một lần, bà bắt được một con ốc rất xinh đẹp, nó có một cái vỏ màu biêng biếc xanh, không hiểu sao bà lại thấy rất yêu con ốc này, bà quyết định không bán và đem về nhà nuôi trong chum nước.\r\nHàng ngày, bà vẫn đi mò cua bắt ốc nhưng khi về đến nhà bà rất đỗi ngạc nhiên thấy sân nhà sạch sẽ, đàn lợn đã được ăn no, vườn rau sạch cỏ và cơm nước nấu tinh tươm. Bà băn khoăn và tự hỏi không biết ai đã giúp mình.\r\nThấy chuyện lạ, bà quyết định rình xem ai là người đã giúp đỡ mình. Bà không ngờ được người giúp bà chính là cô gái chui ra từ trong vỏ ốc xanh kia, từ trong chum nước bước ra. Bà liền bí mật đập vỡ vỏ ốc xanh đi, rồi ôm lấy người con gái, mong cô ở lại sống với bà, cô gái đồng ý. Từ đó, họ sống yêu thương nhau và rất hạnh phúc.',
    status: 'approved',
    tags: [],
    categories: ['viet-nam', '0-3'],
    listened: 0,
    updatedAt: '2023-03-09T07:32:45.965Z',
    banner:
      'https://commun1ty-dev.s3-ap-southeast-1.amazonaws.com/test/1678344230489_5cc482ed-d7d3-40f4-9c6d-903aaefc2a7b-hilltop-with-mother-comforting-her-child_1308-41097-.avif',
    approvedAt: '2023-03-09T07:32:45.965Z',
    duration: 62,
  },
  {
    _id: '64097979cb88f44f4fb77d39',
    title: 'Truyện ngụ ngôn con lừa và bác nông dân',
    content:
      'Một ngày kia, con lừa của bác nông dân sảy chân ngã xuống cái giếng bỏ hoang. Con vật kêu lên thảm thiết nhiều giờ liền trong lúc người chủ của nó nghĩ xem nên làm gì để cứu con lừa lên… Cuối cùng, ông quyết định rằng, vì con lừa cũng già rồi và cái giếng thì đằng nào cũng phải lấp, nên sẽ có cách để không phải bận tâm đến con lừa nữa. Ông mời hàng xóm đến giúp ông một tay. Mỗi ngưởi cầm một cái xẻng xúc đất đổ vào giếng. Nhận ra sự thật phũ phàng, con lừa rên rỉ thảm thiết. Sau khi hứng những xẻng đất đầu tiên, nó hoàn toàn tuyệt vọng, nhìn lên với đôi mắt đầy ai óan. Chỉ đến khi đất ngập đến gần hết chân, nó mới bừng tỉnh, nó cảm nhận điều gì đó đang và sẽ xảy ra đối với nó. Nó không nhìn lên nữa mà cố gắng xoay sở để trồi lên. Bác nông dân và mọi người chăm chú nhìn xuống giếng, họ kinh ngạc trước những gì đang diễn ra. Cứ mỗi xẻng đất đổ lên lưng, con lừa lại lắc mình cho đất rôi xuống chân và bước lên lớp đất ấy. Cứ thế, từng xẻng đất, rồi từng lớp đất. Và chẳng bao lâu, chú lừa đã có thể bước lên miệng giếng, mệt nhọc chạy ra ngoài trước sự ngạc nhiên của tất cả mọi người. Câu chuyện là bài học sâu sắc về cách thích ứng với hoàn cảnh sống khắc nghiệt, trong cuộc sống, chúng ta có những lúc sẽ rơi vào những nghịch cảnh vô cùng khó khăn, điều quan trọng không phải ngồi và than vãn, mà phải biết lợi dụng khó khăn để biến nó thành cơ hội, không được bỏ cuộc trong mọi hoàn cảnh.',
    banner:
      'https://commun1ty-dev.s3-ap-southeast-1.amazonaws.com/test/1678342082924_8fb94156-2c0d-4d22-810a-8f23221245fd-happy-farmer-riding-cart_1308-24513.avif',
    status: 'approved',
    tags: [],
    categories: ['4-6', 'nuoc-ngoai'],
    listened: 0,
    updatedAt: '2023-03-09T07:08:44.031Z',
    approvedAt: '2023-03-09T07:08:44.027Z',
    duration: 102,
  },
] as IStory[]

const MyStories = () => {
  const navigate = useNavigate()
  return (
    <Box p={20} sx={{ width: 380 }}>
      <Button
        leftIcon={<IconArrowLeft />}
        variant='white'
        onClick={() => navigate(-1)}
        sx={{ backgroundColor: 'transparent', color: '#6741D9' }}
      >
        Trở về
      </Button>

      <Text
        sx={{ fontWeight: 700, fontSize: 25, marginTop: 25, marginBottom: 25 }}
      >
        Truyện tôi viết
      </Text>

      {MY_STORIES.map((story) => {
        return (
          <Box key={story._id} mb={10}>
            <StoryItem
              isActive={false}
              story={story}
              playStory={() => {}}
              onSelect={() => {}}
              isPlaying={false}
              isLiked={true}
            />
          </Box>
        )
      })}
    </Box>
  )
}

export default MyStories
