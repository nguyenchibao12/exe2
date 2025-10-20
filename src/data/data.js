// Dữ liệu mock cho các công việc
export const allJobs = [
  {
    id: 1,
    title: 'Content Writer Part-time',
    company: 'TechStart Vietnam',
    logo: '🚀',
    location: 'Quận 1, HCM',
    salary: '80-120k/giờ',
    type: 'Part-time',
    slots: ['Thứ 2, 4, 6', '14:00-18:00'],
    posted: '2 ngày trước',
    applicants: 12,
    rating: 4.8,
    description: 'Chúng tôi đang tìm kiếm một sinh viên năng động, yêu thích viết lách và sáng tạo nội dung cho các dự án marketing của công ty. Bạn sẽ chịu trách nhiệm viết bài cho blog, mạng xã hội và các ấn phẩm truyền thông khác.',
    requirements: [
      'Sinh viên năm 2 trở lên, ưu tiên chuyên ngành Báo chí, Truyền thông, Marketing.',
      'Kỹ năng viết tiếng Việt tốt, không sai chính tả, ngữ pháp rõ ràng.',
      'Sử dụng thành thạo các công cụ văn phòng (Word, Excel).',
      'Có laptop cá nhân.',
      'Sáng tạo, chủ động trong công việc và có tinh thần học hỏi.'
    ],
    benefits: ['Lương thưởng hấp dẫn theo giờ', 'Môi trường làm việc trẻ trung, năng động', 'Được đào tạo về kỹ năng marketing online', 'Thời gian linh hoạt']
  },
  {
    id: 2,
    title: 'Barista Cuối tuần',
    company: 'The Coffee House',
    logo: '☕',
    location: 'Quận 3, HCM',
    salary: '35-45k/giờ',
    type: 'Part-time',
    slots: ['T7, CN', '08:00-14:00'],
    posted: '1 ngày trước',
    applicants: 23,
    rating: 4.6,
    description: 'Cần tuyển Barista làm ca cuối tuần tại cửa hàng trung tâm Quận 3. Công việc bao gồm pha chế, phục vụ khách hàng và giữ gìn vệ sinh khu vực quầy bar. Làm việc trong môi trường năng động, chuyên nghiệp.',
    requirements: [
      'Nhiệt tình, thân thiện và có kỹ năng giao tiếp tốt.',
      'Có khả năng làm việc nhóm.',
      'Ưu tiên ứng viên có kinh nghiệm pha chế, chưa có sẽ được đào tạo.',
      'Chịu được áp lực công việc vào giờ cao điểm.'
    ],
    benefits: ['Đồ uống miễn phí trong ca làm', 'Tips hấp dẫn từ khách hàng', 'Được đào tạo kỹ năng pha chế chuyên nghiệp', 'Cơ hội thăng tiến']
  },
  {
    id: 3,
    title: 'Gia sư Toán - Lý',
    company: 'EduConnect',
    logo: '📚',
    location: 'Quận 7, HCM',
    salary: '100-150k/giờ',
    type: 'Flexible',
    slots: ['Linh động', '18:00-21:00'],
    posted: '5 giờ trước',
    applicants: 8,
    rating: 4.9,
    description: 'Tìm gia sư dạy kèm môn Toán và Vật Lý cho học sinh cấp 3 (lớp 11). Lịch dạy linh động, sắp xếp dựa trên lịch rảnh của sinh viên và học sinh. Yêu cầu kiến thức chuyên môn vững vàng.',
    requirements: [
      'Đang là sinh viên hoặc đã tốt nghiệp các trường Đại học top đầu.',
      'Có thành tích học tập tốt, điểm thi ĐH môn Toán/Lý cao là một lợi thế.',
      'Kỹ năng truyền đạt tốt, dễ hiểu.',
      'Kiên nhẫn, có trách nhiệm với học sinh.'
    ],
    benefits: ['Mức lương cao, trả theo giờ', 'Thời gian làm việc cực kỳ linh động', 'Thưởng thêm dựa trên kết quả học tập của học sinh']
  },
  {
    id: 4,
    title: 'Social Media Intern',
    company: 'Digital Marketing Co.',
    logo: '📱',
    location: 'Remote',
    salary: '50-80k/giờ',
    type: 'Flexible',
    slots: ['Linh động', 'Online'],
    posted: '3 ngày trước',
    applicants: 18,
    rating: 4.7,
    description: 'Tìm kiếm thực tập sinh Social Media, làm việc từ xa. Công việc chính là lên ý tưởng, tạo nội dung (hình ảnh, video ngắn, caption) và quản lý các trang fanpage, TikTok của công ty.',
    requirements: [
      'Am hiểu về các nền tảng mạng xã hội (Facebook, Instagram, TikTok).',
      'Biết sử dụng cơ bản các công cụ thiết kế như Canva, Photoshop.',
      'Có nhiều ý tưởng sáng tạo, bắt trend tốt.',
      'Tự giác, quản lý thời gian tốt khi làm việc remote.'
    ],
    benefits: ['Làm việc 100% remote', 'Học hỏi kinh nghiệm thực tế từ các dự án', 'Có chứng nhận hoàn thành thực tập', 'Cơ hội trở thành nhân viên chính thức']
  },
  {
    id: 5,
    title: 'Nhân viên bán hàng Part-time',
    company: 'Fashion Boutique',
    logo: '👔',
    location: 'Quận 10, HCM',
    salary: '30-40k/giờ + Hoa hồng',
    type: 'Part-time',
    slots: ['Chiều & Tối', '14:00-21:00'],
    posted: '1 tuần trước',
    applicants: 31,
    rating: 4.5,
    description: 'Shop thời trang nam cao cấp cần tuyển nhân viên bán hàng làm ca chiều tối. Công việc bao gồm tư vấn, bán hàng, sắp xếp hàng hóa và giữ vệ sinh cửa hàng.',
    requirements: [
      'Ngoại hình ưa nhìn, giao tiếp tự tin.',
      'Yêu thích thời trang, có gu thẩm mỹ là lợi thế.',
      'Trung thực, nhanh nhẹn.',
      'Có thể làm việc vào các ngày cuối tuần.'
    ],
    benefits: ['Hoa hồng theo doanh số', 'Giảm giá khi mua hàng tại shop', 'Môi trường làm việc thân thiện']
  },
  {
    id: 6,
    title: 'Phụ bếp nhà hàng',
    company: 'Nhà Hàng Sài Gòn',
    logo: '🍜',
    location: 'Quận 5, HCM',
    salary: '35-50k/giờ',
    type: 'Part-time',
    slots: ['Trưa & Tối', '10:00-14:00, 17:00-21:00'],
    posted: '2 giờ trước',
    applicants: 5,
    rating: 4.4,
    description: 'Tuyển phụ bếp làm việc tại nhà hàng món Việt. Công việc: sơ chế nguyên vật liệu, hỗ trợ bếp chính, đảm bảo vệ sinh khu vực bếp.',
    requirements: [
      'Sạch sẽ, gọn gàng, siêng năng.',
      'Chịu khó và ham học hỏi.',
      'Không yêu cầu kinh nghiệm, sẽ được đào tạo.',
      'Sức khỏe tốt.'
    ],
    benefits: ['Bao ăn theo ca', 'Thưởng chuyên cần', 'Làm việc trong môi trường chuyên nghiệp']
  },
  {
    id: 7,
    title: 'Designer Freelance',
    company: 'Creative Studio',
    logo: '🎨',
    location: 'Remote',
    salary: '100-200k/design',
    type: 'Flexible',
    slots: ['Linh động', 'Deadline theo dự án'],
    posted: '4 giờ trước',
    applicants: 15,
    rating: 4.8,
    description: 'Cần tuyển cộng tác viên thiết kế (Freelancer) cho các dự án thiết kế ấn phẩm marketing (Banner, Poster, Standee). Làm việc remote, nhận job theo dự án.',
    requirements: [
      'Sử dụng thành thạo AI, Photoshop.',
      'Có portfolio/dự án đã làm.',
      'Sáng tạo, đảm bảo deadline.',
      'Phản hồi nhanh chóng khi trao đổi công việc.'
    ],
    benefits: ['Làm việc tự do', 'Thanh toán ngay khi hoàn thành dự án', 'Cơ hội hợp tác lâu dài']
  },
  {
    id: 8,
    title: 'MC Sự kiện Part-time',
    company: 'Event Management',
    logo: '🎤',
    location: 'HCM & các tỉnh',
    salary: '500k-1tr/sự kiện',
    type: 'Flexible',
    slots: ['Cuối tuần', 'Theo lịch sự kiện'],
    posted: '1 ngày trước',
    applicants: 9,
    rating: 4.7,
    description: 'Tuyển MC hoạt náo, dẫn dắt các sự kiện (hội thảo, team building, khai trương) vào cuối tuần. Yêu cầu ngoại hình sáng, giọng nói tốt, khả năng xử lý tình huống.',
    requirements: [
      'Ngoại hình sáng, tự tin trước đám đông.',
      'Giọng nói truyền cảm, không nói ngọng, nói lắp.',
      'Có kinh nghiệm làm MC là lợi thế lớn.',
      'Năng động, khuấy động được không khí.'
    ],
    benefits: ['Thu nhập cao theo sự kiện', 'Mở rộng mối quan hệ', 'Đi du lịch miễn phí (nếu sự kiện ở tỉnh)']
  },
  {
    id: 9,
    title: 'Gia sư Tiếng Anh',
    company: 'Language Center',
    logo: '🌍',
    location: 'Quận 2, HCM',
    salary: '120-180k/giờ',
    type: 'Flexible',
    slots: ['Linh động', '18:00-21:00'],
    posted: '3 giờ trước',
    applicants: 14,
    rating: 4.9,
    description: 'Tuyển gia sư tiếng Anh dạy kèm 1-1 cho học sinh mất gốc và luyện thi IELTS. Yêu cầu phát âm chuẩn, ngữ pháp vững, có bằng cấp liên quan.',
    requirements: [
      'IELTS 7.5 trở lên (hoặc tương đương).',
      'Phát âm chuẩn, rõ ràng.',
      'Có kinh nghiệm gia sư, đặc biệt là dạy IELTS.',
      'Nhiệt tình, có phương pháp giảng dạy.'
    ],
    benefits: ['Lương rất cao', 'Thời gian linh động', 'Môi trường làm việc tại trung tâm Anh ngữ (nếu dạy tại trung tâm)']
  },
  {
    id: 10,
    title: 'Nhân viên kho Part-time',
    company: 'Logistics Pro',
    logo: '📦',
    location: 'Quận 12, HCM',
    salary: '30-35k/giờ',
    type: 'Part-time',
    slots: ['Sáng & Chiều', '07:00-12:00, 13:00-17:00'],
    posted: '6 giờ trước',
    applicants: 28,
    rating: 4.3,
    description: 'Công ty logistics cần tuyển nhân viên kho làm việc part-time. Công việc: soạn hàng, đóng gói, dán tem, sắp xếp kho bãi.',
    requirements: [
      'Nam, có sức khỏe tốt.',
      'Cẩn thận, tỉ mỉ.',
      'Trung thực, chăm chỉ.',
      'Có thể làm việc ổn định, lâu dài.'
    ],
    benefits: ['Công việc ổn định', 'Thưởng nếu làm tốt', 'Môi trường làm việc thoải mái']
  },
  {
    id: 11,
    title: 'Video Editor Freelance',
    company: 'Media House',
    logo: '🎬',
    location: 'Remote',
    salary: '200-500k/video',
    type: 'Flexible',
    slots: ['Linh động', 'Online'],
    posted: '1 ngày trước',
    applicants: 22,
    rating: 4.6,
    description: 'Tuyển freelancer edit video ngắn (dưới 3 phút) cho kênh TikTok và YouTube Shorts. Yêu cầu khả năng edit sáng tạo, bắt trend.',
    requirements: [
      'Sử dụng thành thạo Adobe Premiere, CapCut hoặc các phần mềm tương tự.',
      'Sáng tạo, có khả năng tự tìm ý tưởng, bắt trend.',
      'Đảm bảo chất lượng video và deadline.',
      'Có máy tính cá nhân cấu hình tốt.'
    ],
    benefits: ['Làm việc 100% remote', 'Thu nhập theo sản phẩm', 'Nhiều dự án gối đầu']
  },
  {
    id: 12,
    title: 'Lễ tân khách sạn',
    company: 'Hotel Luxury',
    logo: '🏨',
    location: 'Quận 1, HCM',
    salary: '40-55k/giờ',
    type: 'Part-time',
    slots: ['Ca tối', '18:00-00:00'],
    posted: '12 giờ trước',
    applicants: 17,
    rating: 4.7,
    description: 'Khách sạn 4 sao tại Quận 1 tuyển lễ tân part-time ca tối. Công việc: Check-in, check-out cho khách, hỗ trợ thông tin, giải quyết các vấn đề phát sinh.',
    requirements: [
      'Tiếng Anh giao tiếp tốt.',
      'Ngoại hình sáng, thái độ chuyên nghiệp.',
      'Có khả năng xử lý tình huống.',
      'Ưu tiên sinh viên ngành Du lịch, Khách sạn.'
    ],
    benefits: ['Làm việc trong môi trường cao cấp', 'Phụ cấp ca tối', 'Tips cao', 'Đồng phục miễn phí']
  }
];

// Dữ liệu mock cho các bài blog
export const blogPosts = [
  {
    id: 1,
    title: '10 Tips Tìm Việc Part-time Hiệu Quả Cho Sinh Viên',
    excerpt: 'Hướng dẫn chi tiết giúp sinh viên tìm kiếm công việc part-time phù hợp với lịch học và nâng cao cơ hội được tuyển dụng.',
    image: '📝',
    author: 'Nguyễn Văn A',
    date: '15/10/2024',
    readTime: '5 phút',
    category: 'Hướng dẫn',
    content: `Tìm việc part-time không chỉ giúp sinh viên có thêm thu nhập mà còn tích lũy kinh nghiệm làm việc thực tế. Dưới đây là 10 tips hữu ích:

1. Xác định rõ mục tiêu và khả năng của bản thân
Trước khi tìm việc, bạn cần biết mình muốn gì, có thời gian nào rảnh, và kỹ năng gì để đóng góp. Điều này giúp bạn chọn được công việc phù hợp nhất.

2. Tạo CV chuyên nghiệp
Một CV đẹp, rõ ràng sẽ tạo ấn tượng tốt với nhà tuyển dụng. Hãy highlight những kỹ năng và kinh nghiệm liên quan đến vị trí bạn ứng tuyển.

3. Sử dụng các nền tảng tìm việc uy tín
Các website như StudentWork, TopCV, VietnamWorks có nhiều tin tuyển dụng part-time dành cho sinh viên.

4. Mạng lưới quan hệ
Đừng ngại hỏi bạn bè, thầy cô về các cơ hội việc làm. Networking là cách tìm việc hiệu quả nhất.

5. Chuẩn bị kỹ cho buổi phỏng vấn
Tìm hiểu về công ty, chuẩn bị câu trả lời cho các câu hỏi phổ biến, ăn mặc lịch sự và đến đúng giờ.

6. Linh hoạt với thời gian làm việc
Cho nhà tuyển dụng biết bạn có thể làm việc vào những khung giờ nào, và sẵn sàng điều chỉnh nếu cần thiết.

7. Thể hiện sự nhiệt tình
Nhà tuyển dụng đánh giá cao ứng viên có thái độ tích cực, sẵn sàng học hỏi và cống hiến.

8. Follow up sau phỏng vấn
Gửi email cảm ơn sau buổi phỏng vấn thể hiện sự chuyên nghiệp và quan tâm của bạn đến vị trí này.

9. Không ngại thử nghiệm
Đôi khi công việc đầu tiên không phải là lý tưởng, nhưng đó là cơ hội để bạn học hỏi và tích lũy kinh nghiệm.

10. Cân bằng giữa học tập và làm việc
Ưu tiên học tập vẫn là quan trọng nhất. Hãy chọn công việc không ảnh hưởng đến kết quả học tập của bạn.`
  },
  {
    id: 2,
    title: 'Cân Bằng Giữa Học Tập Và Làm Part-time',
    excerpt: 'Làm thế nào để vừa học giỏi vừa làm việc hiệu quả? Bài viết chia sẻ kinh nghiệm thực tế từ các bạn sinh viên.',
    image: '⚖️',
    author: 'Trần Thị B',
    date: '12/10/2024',
    readTime: '7 phút',
    category: 'Kinh nghiệm',
    content: `Nhiều sinh viên lo lắng rằng làm part-time sẽ ảnh hưởng đến học tập. Tuy nhiên, với quản lý thời gian tốt, bạn hoàn toàn có thể cân bằng cả hai.

Lập kế hoạch chi tiết
Sử dụng lịch, app quản lý thời gian để ghi chép lịch học, lịch làm và deadline bài tập. Điều này giúp bạn không bỏ sót việc gì quan trọng.

Ưu tiên công việc
Học tập luôn là ưu tiên số 1. Hãy chọn công việc part-time có thời gian linh hoạt, không đụng độ với giờ học.

Giao tiếp với nhà tuyển dụng
Thông báo trước lịch thi, deadline quan trọng để nhà tuyển dụng hiểu và sắp xếp ca làm phù hợp.

Tận dụng thời gian hiệu quả
Thay vì lướt mạng xã hội, hãy dùng thời gian rảnh để hoàn thành bài tập hoặc ôn thi.

Nghỉ ngơi hợp lý
Đừng quá tải bản thân. Dành thời gian nghỉ ngơi để đảm bảo sức khỏe và duy trì năng suất cao.

Học từ công việc
Nhiều công việc part-time mang lại kỹ năng mềm quý giá như giao tiếp, làm việc nhóm, quản lý thời gian - những điều không thể học được từ sách vở.`
  },
  {
    id: 3,
    title: 'Top 5 Ngành Nghề Part-time Lương Cao Nhất 2024',
    excerpt: 'Khám phá những công việc part-time có mức lương hấp dẫn nhất dành cho sinh viên năm 2024.',
    image: '💰',
    author: 'Lê Văn C',
    date: '10/10/2024',
    readTime: '6 phút',
    category: 'Nghề nghiệp',
    content: `Năm 2024, thị trường việc làm part-time cho sinh viên ngày càng đa dạng với nhiều cơ hội lương cao. Dưới đây là top 5 ngành nghề nổi bật:

1. Gia sư (100k-200k/giờ)
Đây là công việc truyền thống nhưng luôn có nhu cầu cao. Đặc biệt, gia sư các môn như Toán, Lý, Tiếng Anh, lập trình có mức lương rất hấp dẫn.

2. Freelance Marketing/Design (150k-500k/project)
Với sự phát triển của digital marketing, nhu cầu về content creator, designer, video editor rất lớn. Bạn có thể làm việc từ xa và nhận nhiều dự án cùng lúc.

3. Lập trình viên Part-time (200k-500k/giờ)
Nếu bạn biết code, đây là cơ hội tuyệt vời. Nhiều startup và công ty nhỏ cần developer part-time cho các dự án ngắn hạn.

4. MC/Event Staff (500k-2tr/sự kiện)
Cuối tuần luôn có nhiều sự kiện cần MC, nhân viên hỗ trợ. Công việc này không chỉ lương cao mà còn giúp bạn mở rộng network.

5. Barista/F&B cao cấp (40k-80k/giờ + tips)
Các quán café, nhà hàng cao cấp trả lương tốt hơn nhiều so với mức trung bình, kèm theo tips hấp dẫn.

Lưu ý: Lương cao thường đi kèm với yêu cầu kỹ năng và kinh nghiệm. Hãy đầu tư thời gian học hỏi và nâng cao năng lực để có được những công việc này.`
  },
  {
    id: 5, // ID 5 bị lặp, tôi sẽ sửa 1 cái thành 4
    id: 4,
    title: 'Những Sai Lầm Thường Gặp Khi Tìm Việc Part-time',
    excerpt: 'Tránh những sai lầm phổ biến này để tăng cơ hội được nhận việc và thành công trong công việc part-time.',
    image: '⚠️',
    author: 'Hoàng Văn E',
    date: '05/10/2024',
    readTime: '4 phút',
    category: 'Lời khuyên',
    content: `Nhiều sinh viên mắc phải những sai lầm không đáng có khi tìm việc part-time. Dưới đây là những lỗi phổ biến và cách khắc phục:

1. CV không chỉnh chu
Sai lầm: CV có lỗi chính tả, format lộn xộn, thiếu thông tin quan trọng.
Khắc phục: Dành thời gian tạo CV chuyên nghiệp, nhờ người khác review trước khi gửi.

2. Không tìm hiểu về công ty
Sai lầm: Đến phỏng vấn mà không biết gì về công ty, vị trí ứng tuyển.
Khắc phục: Research kỹ về công ty, chuẩn bị câu hỏi thông minh để hỏi nhà tuyển dụng.

3. Đặt kỳ vọng lương quá cao
Sai lầm: Yêu cầu mức lương không phù hợp với năng lực và kinh nghiệm.
Khắc phục: Tìm hiểu mức lương trung bình của vị trí, linh hoạt trong đàm phán.

4. Thiếu chuyên nghiệp
Sai lầm: Đến muộn, ăn mặc không phù hợp, sử dụng điện thoại trong phỏng vấn.
Khắc phục: Coi trọng buổi phỏng vấn, thể hiện sự nghiêm túc và tôn trọng.

5. Không theo dõi sau phỏng vấn
Sai lầm: Sau phỏng vấn là biến mất, không có bất kỳ liên lạc nào.
Khắc phục: Gửi email cảm ơn trong vòng 24h, follow up lịch sự sau 1 tuần nếu chưa có phản hồi.

6. Cam kết quá nhiều
Sai lầm: Nhận việc ở nhiều nơi cùng lúc rồi không hoàn thành tốt.
Khắc phục: Đánh giá khả năng của bản thân, chỉ cam kết những gì có thể thực hiện.

7. Từ bỏ quá sớm
Sai lầm: Bị từ chối vài lần là nản chí, không cố gắng nữa.
Khắc phục: Coi rejection là bài học, tiếp tục cải thiện và thử lại.

Kết luận:
Tìm việc là một quá trình học hỏi. Hãy rút kinh nghiệm từ mỗi lần ứng tuyển để ngày càng tốt hơn!`
  },
  {
    id: 6, // ID 5 bị lặp, tôi sẽ sửa 1 cái thành 6
    id: 5,
    title: 'Remote Work: Xu Hướng Làm Việc Part-time Mới',
    excerpt: 'Làm việc từ xa đang trở thành xu hướng hot. Tìm hiểu về cơ hội và thách thức của remote part-time job.',
    image: '💻',
    author: 'Vũ Thị F',
    date: '01/10/2024',
    readTime: '6 phút',
    category: 'Xu hướng',
    content: `Remote work không còn là khái niệm xa lạ, đặc biệt sau đại dịch. Với sinh viên, đây là cơ hội tuyệt vời để làm part-time mà không bị giới hạn bởi địa lý.

Ưu điểm của Remote Part-time:

1. Tiết kiệm thời gian và chi phí đi lại
Không phải di chuyển đến văn phòng giúp bạn có thêm thời gian cho học tập và nghỉ ngơi.

2. Linh hoạt về thời gian và địa điểm
Bạn có thể làm việc ở bất cứ đâu có internet - từ ký túc xá, café, đến quê nhà.

3. Cơ hội làm việc với công ty quốc tế
Remote mở ra cơ hội được làm việc với các công ty nước ngoài, nhận lương USD.

4. Phát triển kỹ năng tự quản lý
Làm remote đòi hỏi kỷ luật cao, giúp bạn trưởng thành và chuyên nghiệp hơn.

Thách thức và cách vượt qua:

1. Thiếu sự tương tác trực tiếp
Giải pháp: Tham gia các buổi meeting online tích cực, sử dụng chat để giao tiếp với team.

2. Khó tách bạch công việc và cuộc sống
Giải pháp: Tạo không gian làm việc riêng, đặt giờ giấc cụ thể cho công việc.

3. Vấn đề về internet và thiết bị
Giải pháp: Chuẩn bị backup plan (4G, quán café có wifi), đầu tư thiết bị cơ bản.

4. Cảm giác cô đơn
Giải pháp: Thỉnh thoảng làm việc tại co-working space, giữ liên lạc với bạn bè.

Các công việc remote phổ biến cho sinh viên:
- Content Writing
- Graphic Design
- Social Media Management
- Data Entry
- Customer Service
- Tutoring Online
- Translation

Tips để thành công với remote part-time:
- Đầu tư thiết bị làm việc tốt (laptop, webcam, mic)
- Học cách sử dụng các công cụ collaboration (Slack, Zoom, Trello)
- Giao tiếp proactive với team leader
- Báo cáo tiến độ thường xuyên
- Đặt deadline rõ ràng và tuân thủ

Remote work là tương lai của thế giới việc làm. Càng sớm làm quen và thành thạo, bạn càng có nhiều lợi thế trong sự nghiệp!`
  },
];