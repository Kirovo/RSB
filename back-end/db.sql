--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_digest) FROM stdin;
1	admin@admin.com	$2b$05$OxNYOi/HoPk8Q2vuQfecR.QYgRRT7NyeH4v.7dyc82KkUC87aC78m
2	francois	$2b$05$/2G1eYANdqwkIr0vJcv2sel8MHLacNKxxcfd7TEic4hI21j1YeH7u
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, id_user, firstname, lastname, mobile, birthdate, gendre, address, city, postalcode) FROM stdin;
1	1	admin	admin	0123456789	12/12/12	Male	01 admin	Admin	01234
2	2	François	WERYHA				Kazimierza Jeżewskiego 7	Warszawa	02-796
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, id_profile, topic) FROM stdin;
1	1	I hope you will like this website and would be happy to hear from you soon!
2	1	I like medieval reconstruction and I have been doing medieval martial arts for a year and hope, one day to have my own armor.
3	1	…or hikes. 
4	1	As a hobby, I like to challenge myself by attending all sorts of sports events…
5	1	I have a Master degree in General Engineering with a speciality in Embedded systems. Even if I’m not working with any hardware anymore, I always liked programming and want, one day, to make a living out of it. 
6	1	Also I will introduce myself. I’m François, I was born in France to a Polish family. I moved to Warsaw after the pandemic and now I am trying my luck here.
7	1	In short terms, the code needs to be clearer, more consistent, commented, monitoring flow of data, better managing errors and using more tests with the goal to transition to TDD for what I will dedicate the coming weeks.
8	1	The objectives in long terms are to have each user their own page, the possibility for users to be friends, share in a global feed and in a chat.Then the project should deploy, with continuous integration/delivery. 
9	1	Feel free to interact with the website! For now you can log in, log out, register, create and delete posts, react to them and comment.
10	1	This project is still in development, and probably will not be finished anytime soon. For now it consists more of a playground for me to practice diverse skills of the Fullstack world. I want to keep it basic and focused on important aspects like security, scalability and clarity.
11	1	The concept of this project is to be a facebook-like social network for everyday volunteers to find their missions and their communities.
12	1	Welcome and thank you for cloning this project. I hope it wasn’t too difficult to launch it on your device. In any case feel free to share your feedback. It will help a lot! :D
13	2	Francois
\.


--
-- Data for Name: attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attachments (id, id_profile, id_post, path, filename, mime) FROM stdin;
1	\N	1	images\\cheers.jpg	cheers.jpg	image/jpeg
2	\N	2	images\\chrome_2x9mRDO0kN.png	chrome_2x9mRDO0kN.png	image/png
3	\N	3	images\\chrome_wvP1oZHUXi.png	chrome_wvP1oZHUXi.png	image/png
4	\N	4	images\\445094182_10225062938544677_9085442806088263110_n.jpg	445094182_10225062938544677_9085442806088263110_n.jpg	image/jpeg
5	\N	5	images\\ESIGELEC.jpg	ESIGELEC.jpg	image/jpeg
6	\N	6	images\\françois.jpg	françois.jpg	image/jpeg
7	\N	7	images\\short_term.jpg	short_term.jpg	image/jpeg
8	\N	8	images\\long_term.jpg	long_term.jpg	image/jpeg
9	\N	9	images\\CRUD.jpg	CRUD.jpg	image/jpeg
10	\N	10	images\\work-in-progress.jpg	work-in-progress.jpg	image/jpeg
11	\N	11	images\\shutterstock_1155881311_FEAT.jpg	shutterstock_1155881311_FEAT.jpg	image/jpeg
12	\N	12	images\\2d56ede38d6d13ce7b23c7a5b52a7bac.jpg	2d56ede38d6d13ce7b23c7a5b52a7bac.jpg	image/jpeg
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, id_post, id_profile, content) FROM stdin;
\.


--
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.friends (id, id_profile, id_friend) FROM stdin;
\.


--
-- Data for Name: reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reactions (id, id_post, id_profile) FROM stdin;
\.


--
-- Name: attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attachments_id_seq', 12, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: friends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.friends_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 8, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 13, true);


--
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles_id_seq', 2, true);


--
-- Name: reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reactions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

