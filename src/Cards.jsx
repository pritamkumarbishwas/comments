import './card.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import sendLogo from './assets/send.svg'

function Cards() {
    const [selectedLang, setSelectedLang] = useState('en'); // Default language
    const [isOpen, setIsOpen] = useState(false); // Dropdown open state

    useEffect(() => {
        const sessionLang = localStorage.getItem('lang');
        if (sessionLang) {
            setSelectedLang(sessionLang);
        }
    }, []);

    const handleLangSelect = (lang) => {
        setSelectedLang(lang);
        localStorage.setItem('lang', lang);
        setIsOpen(false);
    }

    const langArray = [
        { value: 'au', img: 'https://via.placeholder.com/150/0000FF/808080', text: 'Aman' },
        { value: 'en', img: 'https://via.placeholder.com/150', text: 'Jhon' },
        { value: 'uk', img: 'https://via.placeholder.com/150/FF0000/FFFFFF', text: 'Chandra' },
        { value: 'cn', img: 'https://via.placeholder.com/150/008000/FFFFFF', text: 'Ger' },
        { value: 'de', img: 'https://via.placeholder.com/150/FFD700/000000', text: 'Danish' },
    ];

    const [comments, setComments] = useState([
        { id: 1, name: "Jane Smith", text: "Thanks for assigning me on the task. We’ll get the details ironed out." },
        { id: 2, name: "Jane Smith", text: "Thanks for assigning me on the task. We’ll get the details ironed out." }
    ]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([
                ...comments,
                { id: comments.length + 1, name: "Jane Smith", text: newComment }
            ]);
            setNewComment('');
        }
    };

    const handleDeleteComment = (id) => {
        setComments(comments.filter(comment => comment.id !== id));
    };

    return (
        <div class="task-card">
            <div class="icons-row">
                <i class="fa-regular fa-circle-check"></i>
                <div class="right-icons">
                    <i class="fa-regular fa-trash-can"></i>
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="content">
                <div class="flower mx-auto">
                    <h5>Flower Arrangement</h5>
                </div>
                <div class="date mx-auto my-2">
                    <i class="fa-regular fa-calendar"></i>
                    <span>Dec 5, 2024 at 8:00-10:00 AM</span>
                </div>

                <div className="assign">
                    <label htmlFor="assignee-select">
                        <i className="fa-regular fa-user"></i> Assign to:
                    </label>
                    <div className="assignee">
                        <div className="custom-select">
                            <button className="btn-select" onClick={() => setIsOpen(!isOpen)}>
                                <img src={langArray.find(lang => lang.value === selectedLang).img} alt="" />
                                <span>{langArray.find(lang => lang.value === selectedLang).text}</span>
                            </button>
                            {isOpen && (
                                <div className="custom-options">
                                    {langArray.map((lang, index) => (
                                        <div key={index} className="custom-option" onClick={() => handleLangSelect(lang.value)}>
                                            <img src={lang.img} alt="" />
                                            <span>{lang.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div class="note">
                    <i class="fa-regular fa-note-sticky"></i> Note:
                    <div className='note_text'>
                        09382049832
                        www.flowervendor.com
                    </div>
                </div>
                <hr />

                <div className="comments">
                    <h3>Comments</h3>
                    {comments.map(comment => (
                        <div className="comment" key={comment.id}>
                            <img src="https://via.placeholder.com/30" alt={comment.name} />
                            <div className="comment-text">
                                <span>{comment.name}</span><br />
                                <p>{comment.text}</p>
                            </div>
                            <FontAwesomeIcon icon={faTrash} className='delete_comment' onClick={() => handleDeleteComment(comment.id)} />
                        </div>
                    ))}
                </div>
                <div className="add-comment">
                    <div className="input-wrapper">
                        <img src="https://via.placeholder.com/30" alt="Jane Smith" className="user-avatar" />
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write Comment..."
                        />

                        <img src={sendLogo} className="angle-right-icon" alt="send logo" />

                        {/* <FontAwesomeIcon icon={faAngleRight} className="angle-right-icon" onClick={handleAddComment} /> */}
                    </div>
                </div>



            </div>

        </div>
    );
}

export default Cards;
