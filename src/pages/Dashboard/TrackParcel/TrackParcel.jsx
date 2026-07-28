import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const TrackParcel = () => {
    const { tracking_id } = useParams();
    const axiosInstance = useAxios();

    const { data: trackings = [] } = useQuery({
        queryKey: ['track-parcel', tracking_id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${tracking_id}/logs`);
            return res.data;
        }
    })

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#03464D]">Track Your Parcel</h1>
            <p className="mt-2">Tracking ID: {tracking_id}</p>

            <ul className="timeline timeline-vertical">
                {
                    trackings.map(log =>
                        <li key={log.id} >
                            <div className="timeline-start">{log.created_at}</div>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 text-green-700"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end timeline-box text-xl">{log.message}</div>
                            <hr className="bg-green-700" />
                        </li>
                    )
                }

            </ul>
        </div>
    );
};

export default TrackParcel;