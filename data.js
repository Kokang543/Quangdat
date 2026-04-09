// Hàm lấy tất cả bài viết
function getAllPosts() {
    const stored = localStorage.getItem('vietjack_posts');
    if(stored) return JSON.parse(stored);
    else return getSamplePosts();
}

// Lưu bài viết
function saveAllPosts(posts) {
    localStorage.setItem('vietjack_posts', JSON.stringify(posts));
}

// Thêm bài viết mới
function addPost(post) {
    const posts = getAllPosts();
    const newPost = {
        id: Date.now(),
        ...post,
        date: post.date || new Date().toISOString().slice(0,10)
    };
    posts.unshift(newPost);
    saveAllPosts(posts);
    return newPost;
}

// Cập nhật bài viết
function updatePost(id, updatedData) {
    let posts = getAllPosts();
    const index = posts.findIndex(p => p.id === id);
    if(index !== -1) {
        posts[index] = { ...posts[index], ...updatedData };
        saveAllPosts(posts);
        return true;
    }
    return false;
}

// Xóa bài viết
function deletePostById(id) {
    let posts = getAllPosts();
    posts = posts.filter(p => p.id !== id);
    saveAllPosts(posts);
}

// Lấy bài viết theo id
function getPostById(id) {
    const posts = getAllPosts();
    return posts.find(p => p.id === id);
}

// Dữ liệu mẫu (rất nhiều bài viết cho các lớp)
function getSamplePosts() {
    return [
        { id: 1001, title: "Bài 1: Số tự nhiên - Lớp 1", content: "Học đếm số từ 1 đến 10. Luyện tập viết số.", imageUrl: "https://picsum.photos/id/1/800/400", category: "Toán học", classLevel: "1", date: "2025-02-01" },
        { id: 1002, title: "Bài 2: Phép cộng trong phạm vi 10", content: "Hướng dẫn cộng hai số đơn giản, bài tập thực hành.", imageUrl: "https://picsum.photos/id/2/800/400", category: "Toán học", classLevel: "1", date: "2025-02-02" },
        { id: 1003, title: "Bảng chữ cái tiếng Việt", content: "Làm quen với 29 chữ cái, cách phát âm và viết.", imageUrl: "https://picsum.photos/id/3/800/400", category: "Tiếng Việt", classLevel: "1", date: "2025-02-03" },
        { id: 2001, title: "Ôn tập về phép nhân", content: "Bảng cửu chương từ 2 đến 5, bài tập vận dụng.", imageUrl: "https://picsum.photos/id/4/800/400", category: "Toán học", classLevel: "2", date: "2025-02-04" },
        { id: 3001, title: "Văn tả người - Tả mẹ", content: "Dàn ý và bài văn mẫu tả mẹ lớp 3.", imageUrl: "https://picsum.photos/id/5/800/400", category: "Ngữ văn", classLevel: "3", date: "2025-02-05" },
        { id: 4001, title: "Các chất ở thể rắn, lỏng, khí", content: "Khoa học lớp 4: phân biệt ba thể của chất.", imageUrl: "https://picsum.photos/id/6/800/400", category: "Khoa học", classLevel: "4", date: "2025-02-06" },
        { id: 5001, title: "Địa lý Việt Nam: Các vùng miền", content: "Tìm hiểu ba miền Bắc, Trung, Nam.", imageUrl: "https://picsum.photos/id/7/800/400", category: "Địa lý", classLevel: "5", date: "2025-02-07" },
        { id: 6001, title: "Lịch sử: Khởi nghĩa Hai Bà Trưng", content: "Nguyên nhân, diễn biến và ý nghĩa.", imageUrl: "https://picsum.photos/id/8/800/400", category: "Lịch sử", classLevel: "6", date: "2025-02-08" },
        { id: 7001, title: "Vật lý 7: Định luật Ôm", content: "Công thức I = U/R, bài tập cơ bản.", imageUrl: "https://picsum.photos/id/9/800/400", category: "Vật lý", classLevel: "7", date: "2025-02-09" },
        { id: 8001, title: "Hóa học 8: Phản ứng oxi hóa - khử", content: "Khái niệm chất khử, chất oxi hóa.", imageUrl: "https://picsum.photos/id/10/800/400", category: "Hóa học", classLevel: "8", date: "2025-02-10" },
        { id: 9001, title: "Toán 9: Hệ thức lượng trong tam giác vuông", content: "Định lý Pytago, các hệ thức về cạnh và đường cao.", imageUrl: "https://picsum.photos/id/11/800/400", category: "Toán học", classLevel: "9", date: "2025-02-11" },
        { id: 10001, title: "Ngữ văn 10: Truyện Kiều - Nguyễn Du", content: "Phân tích đoạn trích 'Chị em Thúy Kiều'.", imageUrl: "https://picsum.photos/id/12/800/400", category: "Ngữ văn", classLevel: "10", date: "2025-02-12" },
        { id: 11001, title: "Tiếng Anh 11: Câu điều kiện loại 1,2,3", content: "Cấu trúc, cách dùng và bài tập.", imageUrl: "https://picsum.photos/id/13/800/400", category: "Tiếng Anh", classLevel: "11", date: "2025-02-13" },
        { id: 12001, title: "Vật lý 12: Dao động điều hòa", content: "Phương trình, chu kỳ, tần số.", imageUrl: "https://picsum.photos/id/14/800/400", category: "Vật lý", classLevel: "12", date: "2025-02-14" },
        // Thêm 3 bài thuyết trình đặc biệt
        { id: 13001, title: "🎤 Thuyết trình: Biến đổi khí hậu và hành động của thanh niên", content: "Biến đổi khí hậu đang là thách thức lớn nhất của nhân loại. Nhiệt độ trái đất tăng, băng tan, thiên tai ngày càng khốc liệt. Thanh niên chúng ta cần hành động ngay: trồng cây, giảm rác thải nhựa, sử dụng năng lượng tái tạo. Mỗi hành động nhỏ đều có ý nghĩa lớn. Hãy cùng chung tay bảo vệ hành tinh xanh!", imageUrl: "https://picsum.photos/id/29/800/400", category: "Khoa học", classLevel: "10", date: "2025-03-01" },
        { id: 13002, title: "🎤 Thuyết trình: Văn học dân gian - Kho tàng trí tuệ dân tộc", content: "Văn học dân gian bao gồm truyện cổ tích, ca dao, tục ngữ, thành ngữ... Đó là những bài học quý giá về đạo đức, lối sống và tình yêu quê hương. Qua thuyết trình này, chúng ta sẽ khám phá giá trị của các câu chuyện 'Thạch Sanh', 'Tấm Cám', và những câu ca dao về tình cảm gia đình. Văn học dân gian chính là sợi dây kết nối thế hệ.", imageUrl: "https://picsum.photos/id/12/800/400", category: "Ngữ văn", classLevel: "8", date: "2025-03-02" },
        { id: 13003, title: "🎤 Thuyết trình: Phương pháp học tập hiệu quả cho học sinh", content: "Để học tốt, bạn cần có phương pháp: lập kế hoạch, ghi chú thông minh, ôn tập theo sơ đồ tư duy, và nghỉ ngơi hợp lý. Hãy thử kỹ thuật Pomodoro (25 phút học, 5 phút nghỉ) và tự kiểm tra thường xuyên. Thuyết trình này sẽ giúp bạn cải thiện điểm số và yêu thích việc học hơn.", imageUrl: "https://picsum.photos/id/0/800/400", category: "Kỹ năng", classLevel: "7", date: "2025-03-03" }
    ];
}

// Khởi tạo dữ liệu mẫu nếu chưa có
if(!localStorage.getItem('vietjack_posts')) {
    saveAllPosts(getSamplePosts());
         }
