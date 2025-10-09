import React, { useState } from 'react';
import { Clock, User, ArrowRight, X, Calendar } from 'lucide-react';

const blogPosts = [
  {
    id: 5,
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
    id: 6,
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
  {
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
  },{
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
{id: 5,
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
  }
 
];

function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Tin tức</h1>
          <p className="text-xl text-gray-600">
            Chia sẻ kinh nghiệm, hướng dẫn và thông tin hữu ích về việc làm part-time
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              {/* Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {post.image}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <button className="mt-4 text-indigo-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Đọc thêm <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-2xl z-10">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                      {selectedPost.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedPost.readTime}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedPost.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedPost.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                {/* Featured Image */}
                <div className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-8xl mb-8">
                  {selectedPost.image}
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                </div>

                {/* Share & Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors">
                        Thích bài viết
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        Chia sẻ
                      </button>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin mới nhất</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Nhận các bài viết, tips tìm việc và cơ hội việc làm mới nhất qua email
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 rounded-xl outline-none text-gray-900"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;