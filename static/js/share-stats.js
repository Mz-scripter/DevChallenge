score = document.getElementById('score').value;

// function shareStats() {
//     navigator.share({
//        text: `
//         Can you beat my score on DevChallenge
//         🔗 https://github.com/Mz-scripter
//        `
//     })
// }

async function shareStats() {
    // Capture the game stats div as an image
    const canvas = await html2canvas(document.body, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        allowTaint: true,
        letterRendering: true,
        ignoreElements: element => element.classList.contains('exclude-from-screenshot')
    });

    // Convert canvas to a Blob (actual image file)
    canvas.toBlob(async function (blob) {
        const file = new File([blob], "game-stats.png", { type: "image/png" });

        // Prepare the message text
        const text = `🔥 Check out my DevChallenge stats! 🏆\n\nCan you beat my score? Play now! 👇\nhttps://github.com`;

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            // ✅ Try sharing text + image directly
            navigator.share({
                files: [file],
                title: "DevChallenge Stats",
                text: text
            }).catch(err => console.error("Sharing failed:", err));
        } else {
            // ❌ If direct sharing fails, upload to Cloudinary
            const imageBase64 = canvas.toDataURL("image/png");
            const cloudinaryUrl = await uploadToCloudinary(imageBase64);

            if (cloudinaryUrl) {
                // ✅ Share image as a link fallback
                const encodedText = encodeURIComponent(`${text}\n${cloudinaryUrl}`);
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
                window.open(whatsappUrl, "_blank");
            } else {
                alert("Image upload failed. Try again.");
            }
        }
    }, "image/png");
}


async function shareGameStats() {
    const statsDiv = document.querySelector('.card');

    const canvas = await html2canvas(statsDiv, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
    });

    canvas.toBlob(async function (blob) {
        if (navigator.canShare && navigator.canShare({files: [new File([blob], "game-stats.png", { type: "image/png" })]})) {
            const file = new File([blob], "game-stats.png", { type: "image/png" });
            navigator.share({
                files: [file],
                title: "🔥 Check out my DevChallenge stats! 🏆",
                text: "Can you beat my score? Play now"
            });
        }
    })

    // const imageBase64 = canvas.toDataURL("image/png");

    // const cloudinaryUrl = await uploadToCloudinary(imageBase64);

    // if (!cloudinaryUrl) {
    //     alert("Image upload failed. Try again");
    //     return;
    // }

    // let shareText = `🔥 Check out my DevChallenge stats! 🏆\n\n` +
    //     `⭐ Rank: #1\n💯 Score: 2500\n🔥 Max Streak: 10\n🏆 Total Score: 15000\n\n` +
    //     `Can you beat my score? Play now! 👇\n${cloudinaryUrl}`;

    // if (navigator.share) {
    //     navigator.share({
    //         title: "My Game Stats",
    //         text: shareText,
    //         url: cloudinaryUrl
    //     }).catch(err => console.log("Sharing Failed", err));
    // } else {
    //     alert("Sharing not supported on this device. Copy this link: " + cloudinaryUrl);
    // }
}

async function uploadToCloudinary(imageBase64) {
    const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dusou66pz/image/upload";
    const cloudinaryPreset = "DevChallenge";

    let formData = new FormData();
    formData.append("file", imageBase64);
    formData.append("upload_preset", cloudinaryPreset);

    try {
        let response = await fetch(cloudinaryUploadUrl, {
            method: "POST",
            body: formData
        });

        let data = await response.json();
        if (data.secure_url) {
            return data.secure_url;
        } else {
            console.error("Cloudinary upload failed:", data);
            return null;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}



 function snap() {
    html2canvas(document.querySelector('.card'), {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
    }).then(function(canvas) {
        let link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = "game-stats.png";
        link.click();
    });
}


function shareOnX() {
    html2canvas(document.querySelector('.card'), {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
    }).then(canvas => {
       canvas.toBlob(blob => {
        let formData = new FormData();
        formData.append("file", blob, "game-stats.png");
        formData.append("upload_preset", "DevChallenge");
        
        fetch("https://api.cloudinary.com/v1_1/dusou66pz/image/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.secure_url) {
                let text = encodeURIComponent(`🔥 Check out my DevChallenge stats! 🏆\n\n⭐ Rank: #1\n💯 Score: 2500\n🔥 Max Streak: 10\n🏆 Total Score: 15000\n\nCan you beat my score? Play now! 👇`);
                let imageUrl = encodeURIComponent(data.secure_url);
                let url = encodeURIComponent(data.secure_url);
                let twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                window.open(twitterUrl, "_blank");
            } else {
                alert("Image Upload failed");
            }
        })
        .catch(error => console.error("Upload error: ", error));
       }, "image/png");
    });
}