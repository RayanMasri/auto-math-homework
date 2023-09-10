'use client';
import React, { useState, useEffect, useRef } from 'react';
import calculateTextWidth from 'calculate-text-width';
import html2canvas from 'html2canvas';

export default function Home() {
	const [state, setState] = useState<{
		side: string;
		right: { width: number; lines: number; table: boolean; tableWidth: number; tableHeight: number }[];
		left: { width: number; lines: number; table: boolean; tableWidth: number; tableHeight: number }[];
	}>({
		side: 'right',
		right: [],
		left: [],
	});

	const element = useRef(null);

	let dots = 'normal 16px Arial';
	let question = 'normal 16px formata';

	const getDotsByWidth = (width: number) => {
		if (width <= 0) return '';

		return '.'.repeat(Math.floor(width / calculateTextWidth('.', dots)));
	};

	const getQuestionWidth = (tag: string) => {
		return calculateTextWidth(tag, question) + calculateTextWidth(' ', dots);
	};

	const parseQuestion = (index: number, width: number, lines: number) => {
		if (lines < 1) return 'Failed';

		return (
			<div className="text-[#939598] text-[64px] font-['Arial'] text-right w-fit ">
				{getDotsByWidth(width - getQuestionWidth(`(${index + 1}`))}&nbsp;<span className="text-black font-['formata']">{`(${index + 1}`}</span>
				{new Array(lines - 1).fill(1).map((e) => {
					return <div>{getDotsByWidth(width)}</div>;
				})}
			</div>
		);
	};

	useEffect(() => {
		setState(JSON.parse(localStorage.getItem('jabada') || '{"side":"right","right":[],"left":[]}'));
	}, []);

	useEffect(() => {
		localStorage.setItem('jabada', JSON.stringify(state));
	}, [state]);

	return (
		<div className='w-full h-full fixed top-0 left-0 flex'>
			<button
				onClick={() => {
					console.log(element.current);
					html2canvas(element.current, {
						width: 2380,
						height: 3368,
						scale: 1,
					}).then((canvas) => {
						let url = canvas.toDataURL();
						console.log(url);
						// window.location.href = url;
					});
				}}
			>
				Download
			</button>
			<div className='w-full h-full flex justify-center items-center flex-row'>
				<div className={`w-[2380px] h-[3368px] bg-white box-border`} ref={element}>
					<div className="text-black text-[128px] text-right flex items-center justify-end font-['manal']">اختبار منتصف الفصل - الفصل 1</div>
					<div className='w-full bg-black h-[8px] mt-16'>&nbsp;</div>
					<div className='w-full h-auto flex flex-row'>
						<div className='w-[1190px] box-border p-8 flex flex-col justify-start items-end gap-y-12'>
							{state.left.map((question, index) => {
								return (
									<div className='w-fit flex flex-row gap-x-8'>
										<div className='mt-16'>
											{question.table ? (
												<svg width='420' height='420' viewBox='0 0 420 420'>
													{new Array(question.tableWidth + 1).fill(1).map((_, index) => {
														let y = (420 / question.tableWidth) * index;

														return <line x1='0' y1={y} x2='420' y2={y} stroke='gray' />;
													})}
													{new Array(question.tableHeight + 1).fill(1).map((_, index) => {
														let x = (420 / question.tableHeight) * index;

														return <line x1={x} y1='0' x2={x} y2='420' stroke='gray' />;
													})}

													<line x1='210' y1='0' x2='210' y2='420' strokeWidth='2' stroke='black' />
													<line y1='210' x1='0' y2='210' x2='420' strokeWidth='2' stroke='black' />
													<line x1='210' y1='0' x2='210' y2='420' stroke='black' />

													<line x1='0' y1='0' x2='420' y2='0' stroke='gray' />
													<line x1='0' y1='0' x2='0' y2='420' stroke='gray' />
													<line x1='420' y1='0' x2='420' y2='420' stroke='gray' />
													<line x1='420' y1='420' x2='0' y2='420' stroke='gray' />
												</svg>
											) : (
												''
											)}
										</div>
										{parseQuestion(index + state.right.length, question.width - (question.table ? 110 : 0), question.lines)}
									</div>
								);
							})}
						</div>
						<div className='w-[1190px] box-border p-8 flex flex-col justify-start items-end gap-y-12'>
							{state.right.map((question, index) => {
								return (
									<div className='w-fit flex flex-row gap-x-8'>
										<div className='mt-16'>
											{question.table ? (
												<svg width='420' height='420' viewBox='0 0 420 420'>
													{new Array(question.tableWidth + 1).fill(1).map((_, index) => {
														let y = (420 / question.tableWidth) * index;

														return <line x1='0' y1={y} x2='420' y2={y} stroke='gray' />;
													})}
													{new Array(question.tableHeight + 1).fill(1).map((_, index) => {
														let x = (420 / question.tableHeight) * index;

														return <line x1={x} y1='0' x2={x} y2='420' stroke='gray' />;
													})}

													<line x1='210' y1='0' x2='210' y2='420' strokeWidth='2' stroke='black' />
													<line y1='210' x1='0' y2='210' x2='420' strokeWidth='2' stroke='black' />
													<line x1='210' y1='0' x2='210' y2='420' stroke='black' />

													<line x1='0' y1='0' x2='420' y2='0' stroke='gray' />
													<line x1='0' y1='0' x2='0' y2='420' stroke='gray' />
													<line x1='420' y1='0' x2='420' y2='420' stroke='gray' />
													<line x1='420' y1='420' x2='0' y2='420' stroke='gray' />
												</svg>
											) : (
												''
											)}
										</div>
										{parseQuestion(index, question.width - (question.table ? 110 : 0), question.lines)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className='ml-12 w-[600px] py-10 h-full'>
					<div className='w-full flex flex-row gap-x-8 justify-center items-center'>
						<div
							className={`bg-gray-400 w-[100px] text-center rounded p-2 text-[24px] hover:opacity-50 transition-all ${state.side == 'left' ? 'bg-gray-600' : 'bg-gray-400'}`}
							onClick={() => setState({ ...state, side: 'left' })}
						>
							Left
						</div>
						<div
							className={`bg-gray-400 w-[100px] text-center rounded p-2 text-[24px] hover:opacity-50 transition-all ${state.side == 'right' ? 'bg-gray-600' : 'bg-gray-400'}`}
							onClick={() => setState({ ...state, side: 'right' })}
						>
							Right
						</div>
					</div>

					<div className='w-full flex flex-col pt-2 overflow-scroll h-full'>
						{state[state.side].map((question, index) => {
							let side = state.side;
							return (
								<div className='w-full border-gray-400 border-dashed border-2 p-2 mb-2 flex flex-col'>
									<div className='flex flex-row'>
										<div>{index}</div>
										<div className='mx-2'>-</div>
										<div>Width:</div>&nbsp;
										<input
											type='text'
											value={question.width}
											className='bg-transparent w-[210px] border-b-gray-400 border-b-2 outline-none text-white'
											onChange={(event) => {
												let edited = [...state[side]];

												let value = parseInt(event.target.value);
												edited[index].width = value > 0 ? value : 1;
												setState({
													...state,
													[side]: edited,
												});
											}}
										/>
										<div className='mx-2'>-</div>
										<div>Lines:</div>&nbsp;
										<input
											type='text'
											value={question.lines}
											className='bg-transparent w-[210px] border-b-gray-400 border-b-2 outline-none text-white'
											onChange={(event) => {
												let edited = [...state[side]];

												let value = parseInt(event.target.value);
												edited[index].lines = value > 0 ? value : 1;
												setState({
													...state,
													[side]: edited,
												});
											}}
										/>
									</div>
									<div className='flex flex-row'>
										<div>Table:</div>&nbsp;
										<input
											type='radio'
											value={question.table}
											className='bg-transparent w-fit border-b-gray-400 border-b-2 outline-none text-white'
											onChange={() => {}}
											onClick={(event) => {
												let edited = [...state[side]];
												edited[index].table = !edited[index].table;
												setState({
													...state,
													[side]: edited,
												});
											}}
										/>
										<div className='mx-2'>-</div>
										<div>Width:</div>&nbsp;
										<input
											type='text'
											value={question.tableWidth}
											className='bg-transparent w-[150px] border-b-gray-400 border-b-2 outline-none text-white'
											onChange={(event) => {
												let edited = [...state[side]];

												let value = parseInt(event.target.value);
												edited[index].tableWidth = value > 0 ? value : 1;
												setState({
													...state,
													[side]: edited,
												});
											}}
										/>
										<div className='mx-2'>-</div>
										<div>Height:</div>&nbsp;
										<input
											type='text'
											value={question.tableHeight}
											className='bg-transparent w-[150px] border-b-gray-400 border-b-2 outline-none text-white'
											onChange={(event) => {
												let edited = [...state[side]];

												let value = parseInt(event.target.value);
												edited[index].tableHeight = value > 0 ? value : 1;
												setState({
													...state,
													[side]: edited,
												});
											}}
										/>
									</div>
								</div>
							);
						})}
						<div className='w-full flex justify-center items-center pt-5'>
							<div
								className='text-white bg-gray-500 rounded flex justify-center items-center w-[50px] h-[50px] pb-1 text-[40px] hover:opacity-50 transition-all'
								onClick={() => {
									setState({
										...state,
										[state.side]: state[state.side].concat([{ width: 275, lines: 1, table: false, tableWidth: 0, tableHeight: 0 }]),
									});
								}}
							>
								+
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
