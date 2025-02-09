const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId:  "shopping-list-5aa3b",
    clientEmail: "firebase-adminsdk-fbsvc@shopping-list-5aa3b.iam.gserviceaccount.com",
    // אתה צריך להשתמש ב-private key מה-service account, לא ב-Server Key
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDpbcNZF3NhdLqf\nl9lp0+ZGHPGUF5N/tXgiT8D27OjjVdVq29UbUoTMKZTxV04EyFCEtAnKXTtbTMPG\nM1zwpBNOHTRZZ8ZGkhFcIb87cMo5+9Jn9TT6JgIT7ndZV0ln96Ob20GJOqHpWGf2\nQ8SWVZINGFr+TllH6EvYEAX4uVxrQSmUqAdhBo1W4QwuQ9dIYciYkDrK3cQ+oJ5N\n35duSpuhaLYd0R+ll/xTfL4naU6b32oZXc+smkcp+q+jE2YnLHSIl/bnTT+gCBRr\nmn1cTTMZOS2DxsGZPdbHKKcUTMcFyVnQe/EefRSHHa/ExFJK1mn+NoYzHlJFTdF8\n645ro0elAgMBAAECggEAIySYpHEYuIi6ZWHseYz4E4DdXfkEBoDA9Wl3GQsnL2gH\nbsRp8RMbVcwXgGjZy3PdAMhE271C58acMtrIw0dFy3IvehuwM4UKLV9nSwD6xoAD\nIrjn9kEtTug3+ltfJyfr7ysIqCsLn/XksPltlLSNUytiMlHZXy9kkRgtzfnE0DYA\nTJBP/o7T1WKFXs3mPk+E3rgPsRXEHl5FenOdTdczHbU4nr0InCzAHPT87fBUaFyy\n61FAidvRQUgtbS+4T2GTtlmLh/ImwzeCFGDHyDr+xlx5zeuJDYoUXC0b5tW5HCFi\nnmgei0B8sOETtjxU8Lu8L2o4dQCAfnQLQtRSFWQagQKBgQD5+MT7hGXRdLgwOVXQ\nbTHPKsU76BSzoT1z4y54alKz9FsOzXcy1/72Ow86Tx+J48VHWvsCcwp8fIKAhnHC\nRu2blb+EtPvpBVWYDU8h+Gj6fG8l+oIURGjHzmYG9ndgzK0p2T3mu2j4hflNrfyK\nDKFOi5TyX3uJtJI+CPU7dVfahwKBgQDvDt0MB45EffJ5ZZ+S2uZGRkvd/cQWLliM\nk9TCin5iSk/FyvI6MchyDjGeD5J+nNAWW8CXYlboFs60OyYQY09fYpaHd9gDk4vh\nE37u8cuvTlBAjhyBOt/NfqwjDvwljWMRzgD02dUUW7MSDg+5yhcouDUpS6d77kwR\nVlwudHk7cwKBgQCUy8tduILvOl5FfmuhhM5Idjovncds4cb1y76muQt/yS3G0vFo\nV4CSS7eVyvGIIAgXoIWYAKi2T1tTbDQdJCFeIrZ9JUpqe91mhE2deAPtTtLOtZ5m\nuA3zGd5LuLx4530QUxtw1A/5F6692ZphBoGigp3n5IRiBRWkTarEeOYR0wKBgQDG\nNDuf2q/hJ8+fSVupxeaAw43pi5pFjb2LKJKRjYRF+Dj11FNLXrVDo3MOCvk6EsgQ\nkZg3q6hEm4xcMGJZ2g0YF8SYowutw2qJfcGTWVS4j6TIMUt+9hJS7cDI/Iagl/5Y\n58UxPV6Gl5T71j7BmsXi0//3sis1/JiDE2gweA9/8wKBgF13oHiJS0SBkJNDkr8i\ntHaxm6zSW5YcASOlAIJcShsUPGZb4JqS/M0d8CqeFzFi/E4+lZHPnYe3kTeXrOWG\n6KucaWxNSXEjChS+0/+Ud+a0gTIt2QShp5fk5Dvwdi915sQeMya+ILiYd6r5p2GP\nF89sCpzew0LW0UujgH0x7NxF\n-----END PRIVATE KEY-----\n",
  })
});

module.exports = admin;